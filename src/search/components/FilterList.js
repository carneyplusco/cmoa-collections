import React, { Component } from 'react';
import queryString from 'query-string';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import shortid from 'shortid';

const modalStyles = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  content: {
    padding: 0,
    position: 'static',
    width: 'calc(1200px - 4rem)',
    maxWidth: 'calc(100vw - 4rem)',
    borderRadius: 0
  }
};

const FilterItem = ({
  type, selected = [], value, setFilter
}) => {
  const selectedItems = [].concat(selected);
  return (
    <li className="search-filter__list-item">
      <label className="search-filter__label">
        <input
          type="checkbox"
          checked={selectedItems.includes(value.slug)}
          value={value.slug}
          onChange={e => setFilter(e, type)}
        />
        {value.name}
      </label>
    </li>
  );
};

export default class FilterList extends Component {
  state = {
    filterOpen: false,
    modalOpen: false
  };

  componentWillReceiveProps(nextProps) {
    this.setState(() => ({
      filterOpen: !!nextProps.search[this.props.filter]
    }));
  }

  setFilter = (e, type) => {
    const { search } = this.props;
    const { value } = e.target;
    const values = [].concat(search[type]);
    const newValues = values.includes(value)
      ? values.filter(v => v !== value)
      : values.concat(value);
    const newSearch = { ...search, [type]: newValues };
    const { protocol, host, pathname } = window.location;
    const newUrl = `${protocol}//${host}${pathname}?${queryString.stringify(newSearch)}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    this.props.setSearch(newSearch);
  };

  toggleFilter() {
    this.setState((prevState) => {
      const prevFilterOpen = prevState.filterOpen;
      return {
        filterOpen: !prevFilterOpen
      };
    });
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  render() {
    const {
      filter, title, filterItems = [], search
    } = this.props;
    const { filterOpen, modalOpen } = this.state;
    const filterSet =
      filterItems.length &&
      filterItems.map(filterItem => (
        <FilterItem
          key={shortid.generate()}
          type={filter}
          selected={search[filter]}
          value={filterItem}
          setFilter={this.setFilter}
        />
      ));

    // TODO: work out onkeypress interaction
    return !filterSet ? null : (
      <li className="search-filter">
        <span
          role="link"
          tabIndex={0}
          className="search-filter__name"
          onClick={(e) => {
            e.preventDefault();
            this.toggleFilter();
          }}
          onKeyPress={(e) => {
            e.preventDefault();
            this.toggleFilter();
          }}
        >
          {title}
        </span>
        <button
          type="button"
          className={classNames({ 'quickview-nav__expand': true, 'is-active': filterOpen })}
          onClick={(e) => {
            e.preventDefault();
            this.toggleFilter();
          }}
        >
          <span className="screen-reader-text">Toggle Menu</span>
        </button>
        <ul id={`${filter}-menu`} className={classNames('search-filter__list')}>
          {filterSet.slice(0, 5)}
          <li className={classNames('more-button-item', { hide: filterSet.length <= 5 })}>
            <button type="button" onClick={() => this.toggleModal()}>
              More {title}s
            </button>
          </li>
        </ul>
        <ReactModal
          isOpen={modalOpen}
          appElement={document.getElementById('search-results')}
          onRequestClose={() => this.toggleModal()}
          style={modalStyles}
        >
          <div className="search-filter__name">
            {title}
            <button type="button" className="close-button" onClick={() => this.toggleModal()}>
              ×
            </button>
          </div>
          <div className="modal__list-wrap">
            <ul className="search-filter__list">{filterSet}</ul>
          </div>
        </ReactModal>
      </li>
    );
  }
}
