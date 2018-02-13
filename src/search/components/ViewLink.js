import React, { Component } from 'react';
import classNames from 'classnames';
import queryString from 'query-string';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faList, faThLarge } from '@fortawesome/fontawesome-free-solid';

export default class ViewLink extends Component {
  clickViewLink = (event) => {
    event.preventDefault();
    const { targetView = 'list' } = this.props;
    const newSearch = { ...this.props.search, view: targetView };
    const { protocol, host, pathname } = typeof window !== 'undefined' && window.location;
    const newUrl = `${protocol}//${host}${pathname}?${queryString.stringify(newSearch)}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    this.props.setSearch(newSearch);
  };

  render() {
    const { search = {}, targetView = 'list' } = this.props;
    const { view = 'list' } = search;
    const linkClass = classNames({
      [`${targetView}-link`]: true,
      active: targetView === view
    });
    const icon = targetView === 'list' ? faList : faThLarge;
    const newSearch =
      typeof window !== 'undefined'
        ? { ...queryString.parse(window.location.search), view: targetView }
        : {};
    const href = `/results?${queryString.stringify(newSearch)}`;

    return (
      <a className={linkClass} href={href} onClick={this.clickViewLink}>
        <FontAwesomeIcon icon={icon} />
        <span className="link-text">{targetView} view</span>
      </a>
    );
  }
}
