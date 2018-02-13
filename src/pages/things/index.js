import React from 'react';
import Helmet from 'react-helmet';
import Route from 'route-parser';
import elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({
  host: process.env.ELASTIC_ENDPOINT,
  log: 'trace'
});

const Thing = ({ title }) => (
  <div className="section primary">
    <div className="l-container">
      <div className="l-full">
        <Helmet title={`${title} | CMOA Collection Search`} />
        <h1>{title}</h1>
      </div>
    </div>
  </div>
);

class ThingPage extends React.Component {
  state = {
    thingData: null
  };

  componentDidMount() {
    const route = new Route('/things/:thingId');
    const { thingId } = typeof window !== 'undefined' && route.match(window.location.pathname);

    client
      .get({
        index: 'cmoa_collections',
        type: 'thing',
        id: `cmoa:things/${thingId}`
      })
      .then(thing => this.setState({ thingData: thing._source }));
  }

  render() {
    const { thingData } = this.state;
    const thing = thingData ? <Thing {...thingData} /> : null;
    return <div>{thing}</div>;
  }
}

export default ThingPage;
