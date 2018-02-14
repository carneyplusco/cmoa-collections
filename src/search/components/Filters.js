import React, { Component } from 'react';
import FilterList from './FilterList';

export default class Filters extends Component {
  createFilterSet(type, key = type) {
    const { results, documents, search } = this.props;
    const { hasImage } = search;
    const slugs = [];

    return (
      results
        // create filter list from result list
        .reduce((r, result) => {
          const doc = documents[result.ref];
          const val = doc[key];
          // only include filters if they match the hasImage value
          if ((hasImage && doc.files.length) || (!hasImage && !doc.files.length)) {
            r.push(...(typeof val === 'object' ? val : [{ slug: val.trim(), name: doc[type].trim() }]));
          }
          return r;
        }, [])
        // sort the filter list by name
        .sort((a, b) => a.name.localeCompare(b.name))
        // remove duplicates
        .filter((item) => {
          const test = slugs.indexOf(item.slug) === -1;
          slugs.push(item.slug);
          return test;
        })
    );
  }

  createTagFilterSet() {
    const { tag = [] } = this.props.search;
    const tags = [].concat(tag);
    return !tags
      ? []
      : this.createFilterSet('tag', 'tags').filter(item => tags.includes(item.name) || tags.includes(item.slug));
  }

  render() {
    const { search, setSearch } = this.props;
    return (
      <div>
        <h3 className="search-filter-heading level-5 lighter no-pad">Filter Results</h3>
        <div className="quickview-nav quickview-nav--filter">
          <ul className="search-filters">
            {/*
            <FilterList filter="collection" title="Collection" filterItems={this.createFilterSet('collection')} search={search} setSearch={setSearch} />
            <FilterList filter="creator" title="Creator" filterItems={this.createFilterSet('creator')} search={search} setSearch={setSearch} />
            <FilterList filter="tag" title="Tag" filterItems={this.createTagFilterSet()} search={search} setSearch={setSearch} />
            */}
          </ul>
        </div>
      </div>
    );
  }
}
