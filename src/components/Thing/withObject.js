import React from 'react';
import Route from 'route-parser';
import pluralize from 'pluralize';

export function withObject(ThingComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        thingData: null
      };
    }

    componentDidMount() {
      const route = new Route('/:type/:thingId');
      const { type, thingId } =
        typeof window !== 'undefined' && route.match(window.location.pathname);

      const { ELASTIC_ENDPOINT } = process.env;
      const thingPath = encodeURIComponent(`cmoa:things/${thingId}`);
      const thingURL = `${ELASTIC_ENDPOINT}/cmoa_collections/${pluralize.singular(type)}/${thingPath}/_source`;

      fetch(thingURL)
        .then(thing => thing.json())
        .then((thingData) => {
          this.setState({ thingData });
        });
    }

    render() {
      return <ThingComponent thingData={this.state.thingData} {...this.props} />;
    }
  };
}
