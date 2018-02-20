import React from 'react';
import Helmet from 'react-helmet';
import Masthead from './Masthead';
import Creator from './Creator';

const Thing = ({
  title,
  images = [],
  creators,
  creation_date: creationDate,
  medium_description: medium,
  credit_line: credit,
  accession_number: accessionNumber,
  current_location: location
}) => {
  const permittedImages = images.filter(image => image.permitted);
  const image = permittedImages.length ? <Masthead title={title} images={permittedImages} /> : null;
  const validDates = creationDate.filter(date => date !== null);
  const date = validDates.reduce(
    (prev, current) => (!prev || prev === current ? current : `${prev} - ${current}`),
    ''
  );
  const creatorList = creators.map(creator => <Creator key={creator.id} {...creator} />);
  return (
    <div>
      <Helmet title={`${title} | CMOA Collection Search`} />
      {image}
      <section className="primary pad" id="item-info">
        <div className="l-container">
          <div className="l-full">
            <article className="object">
              <h1 className="level-2 alt">{title}</h1>

              <div className="object__attributes">
                {!!creators.length && (
                  <dl className="object__attributes-row">
                    <dt className="label">Creator(s):</dt>
                    <dd className="value">{creatorList}</dd>
                  </dl>
                )}
                {!!validDates.length && (
                  <dl className="object__attributes-row">
                    <dt className="label">Date:</dt>
                    <dd className="value">{date}</dd>
                  </dl>
                )}
                {medium && (
                  <dl className="object__attributes-row">
                    <dt className="label">Medium:</dt>
                    <dd className="value">{medium}</dd>
                  </dl>
                )}
                {credit && (
                  <dl className="object__attributes-row">
                    <dt className="label">Credit:</dt>
                    <dd className="value">{credit}</dd>
                  </dl>
                )}
                {accessionNumber && (
                  <dl className="object__attributes-row">
                    <dt className="label">Accession number:</dt>
                    <dd className="value">{accessionNumber}</dd>
                  </dl>
                )}
                {location && (
                  <dl className="object__attributes-row">
                    <dt className="label">Location:</dt>
                    <dd className="value">{location}</dd>
                  </dl>
                )}
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Thing;
