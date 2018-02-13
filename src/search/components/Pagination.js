import React, { Component } from 'react';
import queryString from 'query-string';
import classNames from 'classnames';
import Scroll from 'react-scroll';
import shortid from 'shortid';

const defaults = require('../constants/PaginationDefaults');

function getSanitizedURLParams(resultCount, search) {
  // sanitize param values so they fall within our min/max values
  const perPage = search.perPage
    ? Math.min(Math.max(search.perPage, defaults.perPage), defaults.perPageMax)
    : defaults.perPage;
  const pageMax = Math.max(Math.ceil(resultCount / perPage), defaults.page);
  const page = search.page
    ? Math.min(Math.max(search.page, defaults.page), pageMax)
    : defaults.page;

  return { ...search, perPage, page };
}

class ParamLink extends Component {
  static defaultProps = {
    resultCount: 0,
    param: 'page',
    value: 10,
    className: '',
    search: {}
  };

  clickParamLink = (event) => {
    event.preventDefault();
    const {
      resultCount = 0, search, param, value, setSearch
    } = this.props;
    const newSearch = { ...getSanitizedURLParams(resultCount, search), [param]: value };
    const { protocol, host, pathname } = typeof window !== 'undefined' && window.location;
    const newUrl = `${protocol}//${host}${pathname}?${queryString.stringify(newSearch)}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    setSearch(newSearch);
    Scroll.animateScroll.scrollToTop();
  };

  render() {
    const {
      resultCount = 0, search, param, value, children, className
    } = this.props;
    const newSearch = { ...getSanitizedURLParams(resultCount, search), [param]: value };
    const { protocol, host, pathname } = typeof window !== 'undefined' && window.location;
    const url = `${protocol}//${host}${pathname}?${queryString.stringify(newSearch)}`;
    return (
      <a href={url} className={className} onClick={this.clickParamLink}>
        {children}
      </a>
    );
  }
}

const Pagination = ({ resultCount = 0, search = {}, setSearch = () => {} }) => {
  const params = getSanitizedURLParams(resultCount, search);
  const pageMax = Math.max(Math.ceil(resultCount / params.perPage), defaults.page);

  // create previous / next page links
  const prevLink =
    params.page - 1 >= 1 ? (
      <ParamLink
        resultCount={resultCount}
        param="page"
        value={params.page - 1}
        className="prev"
        search={search}
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
        resultCount={resultCount}
        param="page"
        value={params.page + 1}
        className="next"
        search={search}
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
          resultCount={resultCount}
          param="page"
          value={page}
          className={className}
          search={search}
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
    perPage <= resultCount);

  const perPageLinks = perPageOptions.map((perPage) => {
    const current = params.perPage === perPage;
    const className = classNames({ active: current });
    return (
      <li key={shortid.generate()} className={className}>
        <ParamLink
          resultCount={resultCount}
          param="perPage"
          value={perPage}
          className={className}
          search={search}
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

export { Pagination, getSanitizedURLParams };
