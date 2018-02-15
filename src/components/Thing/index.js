import React from 'react';
import Helmet from 'react-helmet';
import Masthead from './Masthead';
import Creator from './Creator';

const Thing = ({
  title,
  images,
  creators,
  creation_date: creationDate,
  medium_description: medium,
  credit_line: credit,
  accession_number: accessionNumber,
  current_location: location
}) => {
  const image = images.length ? <Masthead title={title} images={images} /> : null;
  const date = creationDate.reduce(
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

              <table className="object__attributes">
                <thead>
                  <tr>
                    <th className="label" />
                    <th className="value" />
                  </tr>
                  {creators.length && (
                    <tr>
                      <td className="label">Creator(s):</td>
                      <td className="value">{creatorList}</td>
                    </tr>
                  )}
                  {creationDate && (
                    <tr>
                      <td className="label">Date:</td>
                      <td className="value">{date}</td>
                    </tr>
                  )}
                  {medium && (
                    <tr>
                      <td className="label">Medium:</td>
                      <td className="value">{medium}</td>
                    </tr>
                  )}
                  {credit && (
                    <tr>
                      <td className="label">Credit:</td>
                      <td className="value">{credit}</td>
                    </tr>
                  )}
                  {accessionNumber && (
                    <tr>
                      <td className="label">Accession number:</td>
                      <td className="value">{accessionNumber}</td>
                    </tr>
                  )}
                  {location && (
                    <tr>
                      <td className="label">Location:</td>
                      <td className="value">{location}</td>
                    </tr>
                  )}
                </thead>
              </table>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Thing;
