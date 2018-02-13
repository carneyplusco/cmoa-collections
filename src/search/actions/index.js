import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import * as types from '../constants/ActionTypes';

async function fetchResults(query) {
  const response = await fetch(`${process.env.ELASTIC_ENDPOINT}/cmoa_collections/_search`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }),
    body: JSON.stringify(query)
  });

  const { hits } = await response.json();
  return hits;
}

function setResults() {
  return async (dispatch, getState) => {
    const state = getState();
    const { search } = state;
    const { q = '' } = search;
    const defaultQuery = { query: { match_all: {} } };
    const query = !q
      ? defaultQuery
      : {
        query: {
          bool: {
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
        }
      };
    const { hits: results = [], total } = await fetchResults(query);

    return dispatch({
      type: types.SET_RESULTS,
      results,
      total
    });
  };
}

export function setSearch() {
  return (dispatch) => {
    dispatch({
      type: types.SET_SEARCH,
      search: typeof window !== 'undefined' ? queryString.parse(window.location.search) : {}
    });
    return dispatch(setResults());
  };
}
