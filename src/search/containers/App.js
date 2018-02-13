import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import pluralize from 'pluralize';
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
      <div className="collection">
        <div className="l-container search-results-header">
          <div className="l-long search-results-title">
            <h1 className="level-2 no-pad">Collection</h1>
            <h2
              className={classNames('level-3', 'thinner', {
                hide: !q && !tag && !creator && !collection
              })}
            >
              {resultText}
            </h2>
          </div>
          <div className="l-short view-links">
            <ViewLink targetView="grid" search={search} setSearch={setSearch} />
            <ViewLink targetView="list" search={search} setSearch={setSearch} />
          </div>
        </div>
        <div className="l-container">
          <div className="l-shorter">
            <Filters search={search} results={results} setSearch={setSearch} />
          </div>
          <div className="l-longer">
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
