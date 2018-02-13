import React, { Component } from 'react';
import queryString from 'query-string';
import classNames from 'classnames';
import Scroll from 'react-scroll';
import shortid from 'shortid';
import Results from './Results';

const defaults = {
  page: 1,
  perPage: 10,
  perPageMax: 100,
  q: ''
};

const updateURLParams = (newParams) => {
  const query =
    typeof window !== 'undefined' ? queryString.parse(window.location.search) : defaults;

  // save original param values (coerced to int) or set default if null
  query.page = query.page ? parseInt(query.page, 10) : defaults.page;
  query.perPage = query.perPage ? parseInt(query.perPage, 10) : defaults.perPage;

  // update URL params if necessary
  if (query.page !== newParams.page || query.perPage !== newParams.perPage) {
    const newSearch = queryString.stringify(newParams);
    const { protocol, host, pathname } = typeof window !== 'undefined' && window.location;
    const newURL = `${protocol}//${host}${pathname}?${newSearch}`;
    window.history.pushState({ path: newURL }, '', newURL);
  }
};

const getSanitizedURLParams = (resultCount) => {
  const query =
    typeof window !== 'undefined' ? queryString.parse(window.location.search) : defaults;

  // sanitize param values so they fall within our min/max values
  const perPage = query.perPage
    ? Math.min(Math.max(query.perPage, defaults.perPage), defaults.perPageMax)
    : defaults.perPage;
  const pageMax = Math.max(Math.ceil(resultCount / perPage), defaults.page);
  const page = query.page ? Math.min(Math.max(query.page, defaults.page), pageMax) : defaults.page;

  query.perPage = perPage;
  query.page = page;

  return query;
};

const paginateResults = (results = []) => {
  const params = getSanitizedURLParams(results.length);

  if (results.length) {
    updateURLParams(params);
  }

  const { perPage = defaults.perPage, page = defaults.page } = params;
  const start = perPage * (page - 1);
  const end = start + perPage;

  return results.slice(start, end);
};

const PaginatedResults = ({ results = [], view = 'list' }) => {
  const paginatedResults = paginateResults(results);

  return <Results results={paginatedResults} view={view} />;
};

class ParamLink extends Component {
  static defaultProps = {
    results: [],
    param: 'page',
    value: 10,
    className: ''
  };

  clickParamLink = (event) => {
    event.preventDefault();
    const newSearch = getSanitizedURLParams(this.props.results.length);
    newSearch[this.props.param] = this.props.value;
    const { protocol, host, pathname } = typeof window !== 'undefined' && window.location;
    const newUrl = `${protocol}//${host}${pathname}?${queryString.stringify(newSearch)}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    this.props.setSearch(newSearch);
    Scroll.animateScroll.scrollToTop();
  };

  render() {
    const newSearch = getSanitizedURLParams(this.props.results.length);
    newSearch[this.props.param] = this.props.value;
    const search = queryString.stringify(newSearch);
    const { protocol, host, pathname } = typeof window !== 'undefined' && window.location;
    const url = `${protocol}//${host}${pathname}?${search}`;

    return (
      <a href={url} className={this.props.className} onClick={this.clickParamLink}>
        {this.props.children}
      </a>
    );
  }
}

const Pagination = ({ results = [], setSearch = () => {} }) => {
  const params = getSanitizedURLParams(results.length);
  const pageMax = Math.max(Math.ceil(results.length / params.perPage), defaults.page);

  // create previous / next page links
  const prevLink =
    params.page - 1 >= 1 ? (
      <ParamLink
        results={results}
        param="page"
        value={params.page - 1}
        className="prev"
        setSearch={setSearch}
      >
        <span className="screen-reader-text">Previous</span>
        <i className="fas fa-chevron-left" />
      </ParamLink>
    ) : (
      ''
    );

  const nextLink =
    params.page + 1 <= pageMax ? (
      <ParamLink
        results={results}
        param="page"
        value={params.page + 1}
        className="next"
        setSearch={setSearch}
      >
        <span className="screen-reader-text">Next</span>
        <i className="fas fa-chevron-right" />
      </ParamLink>
    ) : (
      ''
    );

  // create numbered page links
  const pages = Array.from(Array(pageMax).keys());
  let include = true;
  const pageLinks = pages.map((value, index) => {
    const page = index + 1;
    const current = params.page === page;
    const start = page <= 2;
    const middle = page >= params.page - 1 && page <= params.page + 1;
    const end = page >= pageMax - 1;
    const lastInclude = include;
    include = current || start || middle || end;
    const className = classNames({ active: current, ellipses: !lastInclude && include });

    return !include ? null : (
      <li key={shortid.generate()} className={className}>
        <ParamLink
          results={results}
          param="page"
          value={page}
          className={className}
          setSearch={setSearch}
        >
          <span aria-label={`Go to Page ${page}`} aria-current={current}>
            {page}
          </span>
        </ParamLink>
      </li>
    );
  });

  // create "results per page" links
  const perPageOptions = [10, 20, 50, 100].filter(perPage =>
    // exclude if perPage value is greater than result set
    perPage <= results.length);

  const perPageLinks = perPageOptions.map((perPage) => {
    const current = params.perPage === perPage;
    const className = classNames({ active: current });
    return (
      <li key={shortid.generate()} className={className}>
        <ParamLink
          results={results}
          param="perPage"
          value={perPage}
          className={className}
          setSearch={setSearch}
        >
          {perPage}
        </ParamLink>
      </li>
    );
  });

  const singlePage = pageMax === 1;
  const ltMinPageSize = perPageOptions.length < 2;

  const pageLinksClassname = classNames({
    'page-links': true,
    hidden: singlePage
  });

  const perPageClassname = classNames({
    'per-page': true,
    hidden: ltMinPageSize
  });

  const paginationClassname = classNames({
    pagination: true,
    hidden: singlePage && ltMinPageSize
  });

  return (
    <div className={paginationClassname}>
      <nav className={pageLinksClassname} aria-label="Pagination navigation">
        <div className="prev-wrap">{prevLink}</div>
        <div className="next-wrap">{nextLink}</div>

        <ol className="page-links-list list--inline">{pageLinks}</ol>
      </nav>

      <div className={perPageClassname}>
        Results per page
        <ol className="per-page-list list--inline">{perPageLinks}</ol>
      </div>
    </div>
  );
};

export { PaginatedResults, Pagination };
