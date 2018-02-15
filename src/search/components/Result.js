import React from 'react';
import { extractId } from '../../util';

const NoImage = ({ link = '#' }) => (
  <a href={link} className="search-result__no-image">
    <p>No Image Available</p>
  </a>
);

const Result = ({ document, type }) => {
  const {
    id = '', title, creators = [], creation_date: creationDate = [], images = []
  } = document;
  const itemLink = `/${type}/${extractId(id)}`;
  const creatorLinks = creators.map(creator => (
    <a
      key={extractId(creator.id)}
      href={`/parties/${extractId(creator.id)}`}
      className="search-result__creator-link"
    >
      {creator.name}
    </a>
  ));
  const image = images.length ? (
    <a href={itemLink}>
      <img src={images[0]} alt={title} />
    </a>
  ) : (
    <NoImage link={itemLink} />
  );
  const date = creationDate.reduce(
    (prev, current) => (!prev || prev === current ? current : `${prev} - ${current}`),
    ''
  );
  return (
    <li className="search-result l-container">
      <div className="search-result__info">
        <a href={itemLink} className="search-result__title">
          {title}
        </a>
        <label className="search-result__label">Creator:</label>
        <div className="search-result__value">{creatorLinks}</div>
        <label className="search-result__label">Date:</label>
        <span className="search-result__value">{date}</span>
      </div>
      <div className="search-result__image">{image}</div>
    </li>
  );
};

export default Result;
