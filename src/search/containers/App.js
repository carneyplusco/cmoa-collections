import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import pluralize from 'pluralize';
import queryString from 'query-string';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import Filters from '../components/Filters';
import Result from '../components/Result';
import Results from '../components/Results';
import { Pagination } from '../components/Pagination';
import ViewLink from '../components/ViewLink';
import * as Actions from '../actions';

function formatNumber(number) {
  return parseFloat(number).toLocaleString('en-US');
}

class App extends Component {
  componentDidMount() {
    this.props.setSearch();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { search, setSearch } = this.props;
    const searchInput = event.target.querySelector('.search-input');
    const newSearch = { ...search, q: searchInput.value };
    const { protocol, host, pathname } = typeof window !== 'undefined' && window.location;
    const newUrl = `${protocol}//${host}${pathname}?${queryString.stringify(newSearch)}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    setSearch(newSearch);
  };

  render() {
    const {
      search, results, setSearch, resultCount, totalCount
    } = this.props;
    const {
      q, tag, collection, creator
    } = search;
    const queryText = q ? `for "${q}" ` : '';
    const resultText = totalCount
      ? `${formatNumber(resultCount)} ${pluralize('result', resultCount)}
      ${queryText} out of ${formatNumber(totalCount)} records`
      : 'Searching...';

    const resultList = results.map(result => (
      <Result key={result._id} type={result._type} document={result._source} />
    ));

    return (
      <div className="collection section primary">
        <div className="l-container">
          <div className="l-shorter search-results-title">
            <h1 className="level-2 no-pad">Collection</h1>
          </div>
          <div className="l-longer">
            <form className="search-form" action="/search" onSubmit={this.handleSubmit}>
              <input
                className="search-input"
                name="q"
                id="search"
                type="search"
                placeholder="Search the collection..."
              />
              <button className="search-button" type="submit">
                <span className="screen-reader-text">Search</span>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>
        </div>
        <div className="l-container">
          <div className="l-shorter">
            <Filters search={search} results={results} setSearch={setSearch} />
          </div>
          <div className="l-longer">
            <header className="search-results-header">
              <h2
                className={classNames('search-results-count', 'level-5', 'thinner', {
                  hide: !q && !tag && !creator && !collection
                })}
              >
                {resultText}
              </h2>
              <div className="view-links">
                <ViewLink targetView="grid" search={search} setSearch={setSearch} />
                <ViewLink targetView="list" search={search} setSearch={setSearch} />
              </div>
            </header>
            <Results results={resultList} view={search.view} />
          </div>
        </div>
        <div className="l-container">
          <div className="l-full">
            <Pagination resultCount={resultCount} setSearch={setSearch} search={search} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
  results: state.results,
  resultCount: state.resultCount,
  totalCount: state.totalCount
});

const mapDispatchToProps = dispatch => ({
  setSearch() {
    dispatch(Actions.setSearch());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
