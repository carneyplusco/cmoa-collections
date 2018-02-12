import React from 'react';
import { Provider } from 'react-redux';
// import { render } from 'react-dom';
import configureStore from '../search/store/configureStore';
import App from '../search/containers/App';

const store = configureStore();

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('search-results')
// );

const Search = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Search;
