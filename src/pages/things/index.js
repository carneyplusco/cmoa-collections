import React from 'react';
import Route from 'route-parser';
import elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({
  host: process.env.ELASTIC_ENDPOINT,
  log: 'trace'
});

const Thing = ({ title }) => <h1>{title}</h1>;

class ThingPage extends React.Component {
  state = {
    thingData: null
  };

  componentDidMount() {
    const route = new Route('/things/:thingId');
    const { thingId } = route.match(window.location.pathname);

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
