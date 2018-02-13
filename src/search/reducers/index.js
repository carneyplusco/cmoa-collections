import * as types from '../constants/ActionTypes';

const initialState = {
  search: {},
  results: [],
  resultCount: null,
  totalCount: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SEARCH:
      return { ...state, search: action.search };

    case types.SET_TOTAL:
      return { ...state, totalCount: action.totalCount };

    case types.SET_RESULTS:
      return { ...state, results: action.results, resultCount: action.resultCount };

    default:
      return state;
  }
};

export default rootReducer;
