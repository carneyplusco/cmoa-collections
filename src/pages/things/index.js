import React from 'react';
import Route from 'route-parser';
import elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({
  host: 'https://search-cmoa-collections-dev-yeorlt2ileqyrzesg35exbxa6y.us-east-1.es.amazonaws.com',
  log: 'trace'
});

const Thing = ({title}) => (
  <h1>{title}</h1>
);

// const Thing = () => {
class ThingPage extends React.Component {
  state = {
    thing_data: null
  }

  componentDidMount() {
    const route = new Route('/things/:thingId');
    const { thingId } = route.match(location.pathname);

    client
      .get({
        index: 'cmoa_collections',
        type: 'thing',
        id: `cmoa:things/${thingId}`
      })
      .then(thing => this.setState({thing_data: thing._source}));
  }
  
  render() {
    const { thing_data } = this.state;
    const thing = thing_data ? <Thing {...thing_data} /> : null;
    return (
      <div>
        {thing}
      </div>
    )
  }
};

export default ThingPage
