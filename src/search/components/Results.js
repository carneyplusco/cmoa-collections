import React from 'react';
import Masonry from 'react-masonry-component';

const Results = ({ results = [], view = 'list' }) => {
  if (view === 'grid') {
    return (
      <Masonry className="search-results search-results--masonry" elementType="ul">
        {results}
      </Masonry>
    );
  }
  return <ul className="search-results search-results--list">{results}</ul>;
};

export default Results;
