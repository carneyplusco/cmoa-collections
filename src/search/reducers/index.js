import queryString from 'query-string';
import * as types from '../constants/ActionTypes';

const initialState = {
  search: queryString.parse(window.location.search),
  results: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SEARCH:
      return { ...state, search: action.search };

    case types.SET_RESULTS:
      return { ...state, results: action.results };

    default:
      return state;
  }
};

export default rootReducer;
