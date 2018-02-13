import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import * as types from '../constants/ActionTypes';
import { getSanitizedURLParams } from '../components/Pagination';

function queryElastic(endpoint, query) {
  const defaultOptions = {
    method: query ? 'POST' : 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })
  };

  const queryOptions = { ...defaultOptions, body: JSON.stringify(query) };
  return fetch(
    `${process.env.ELASTIC_ENDPOINT}/cmoa_collections/${endpoint}`,
    query ? queryOptions : defaultOptions
  );
}

async function fetchResults(query) {
  const response = await queryElastic('_search', query);
  const { hits } = await response.json();
  return hits;
}

function setResults() {
  return async (dispatch, getState) => {
    const { search = {}, resultCount, totalCount = 0 } = getState();
    const count = resultCount === null ? totalCount : resultCount;
    const sanitizedSearch = getSanitizedURLParams(count, search);
    const { q = '', perPage, page } = sanitizedSearch;
    const pagination = {
      size: perPage,
      from: perPage * (page - 1)
    };
    const defaultQuery = {
      query: { bool: { filter: [{ terms: { _type: ['thing', 'teenie'] } }] } },
      ...pagination
    };
    const searchQuery = {
      query: {
        bool: {
          filter: [{ terms: { _type: ['thing', 'teenie'] } }],
          must: [
            {
              match: {
                _all: {
                  query: q
                }
              }
            }
          ],
          should: [
            {
              match: {
                title: q
              }
            }
          ]
        }
      },
      ...pagination
    };
    const { hits: results = [], total } = await fetchResults(q ? searchQuery : defaultQuery);

    return dispatch({
      type: types.SET_RESULTS,
      results,
      resultCount: total
    });
  };
}

function setTotal() {
  return async (dispatch) => {
    const response = await queryElastic('_stats/docs');
    const { _all } = await response.json();

    return dispatch({
      type: types.SET_TOTAL,
      totalCount: _all.primaries.docs.count
    });
  };
}

function fetchTotalIfNeeded() {
  return (dispatch, getState) => {
    const { totalCount = null } = getState();
    return totalCount === null ? dispatch(setTotal()) : Promise.resolve();
  };
}

export function setSearch() {
  return dispatch =>
    dispatch(fetchTotalIfNeeded()).then(() => {
      dispatch({
        type: types.SET_SEARCH,
        search: typeof window !== 'undefined' ? queryString.parse(window.location.search) : {}
      });
      return dispatch(setResults());
    });
}
