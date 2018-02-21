import React from 'react';
import pluralize from 'pluralize';
import { extractId } from '../../util';

pluralize.addPluralRule(/teenie$/i, 'teenie');

const NoImage = ({ link = '#' }) => (
  <a href={link} className="search-result__no-image">
    <p>No Image Available</p>
  </a>
);

const Result = ({ document, type }) => {
  const {
    id = '', title, creators = [], creation_date: creationDate = [], images = []
  } = document;
  const itemLink = `/${pluralize(type)}/${extractId(id)}`;
  const creatorLinks = creators.map(creator => (
    <a
      key={extractId(creator.id)}
      href={`/parties/${extractId(creator.id)}`}
      className="search-result__creator-link"
    >
      {creator.name}
    </a>
  ));
  const permittedImages = images.filter(image => image.permitted);
  const image = permittedImages.length ? (
    <a href={itemLink}>
      <img
        src={`http://collection.cmoa.org/CollectionImage.aspx?irn=${images[0].irn}&size=Large`}
        alt={title}
      />
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
