import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import pluralize from 'pluralize';
import Filters from '../components/Filters';
import Result from '../components/Result';
import { PaginatedResults, Pagination } from '../components/Pagination';
import ViewLink from '../components/ViewLink';
import * as Actions from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.setSearch();
  }

  render() {
    const { search, results, setSearch } = this.props;
    const {
      q, tag, collection, creator
    } = search;
    const totalCount = 'TODO';
    const queryText = q ? `for "${q}" ` : '';
    const resultText = totalCount
      ? `${results.length} ${pluralize('result', results.length)} 
      ${queryText} out of ${totalCount} records`
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
            <PaginatedResults results={resultList} view={search.view} />
          </div>
        </div>
        <div className="l-container">
          <div className="l-full">
            <Pagination results={resultList} setSearch={setSearch} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
  results: state.results
});

const mapDispatchToProps = dispatch => ({
  setSearch() {
    dispatch(Actions.setSearch());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
