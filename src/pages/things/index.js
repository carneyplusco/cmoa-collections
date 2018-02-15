import React from 'react';
import { withObject } from '../../components/Thing/withObject';
import Thing from '../../components/Thing';

const ThingPage = ({ thingData }) => {
  const thing = thingData ? <Thing {...thingData} /> : null;
  return <div>{thing}</div>;
};

export default withObject(ThingPage);
