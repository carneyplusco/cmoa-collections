import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../search/store/configureStore';
import App from '../search/containers/App';

const store = configureStore();

const Search = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Search;
