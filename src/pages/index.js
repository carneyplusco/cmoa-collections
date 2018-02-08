import React from 'react';
import Link from 'gatsby-link';

import '../assets/styles/main.scss';

const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>Searching from {process.env.NODE_ENV}</p>
    <p>
      <Link to="/things/6bd89462-6774-4617-bdfb-11bcb20c06ea">Go to bowl</Link>
    </p>
    <p>
      <Link to="/things/08371e5d-1c2c-42df-867e-b32e61685a44">Go to rose bowl</Link>
    </p>
  </div>
);

export default IndexPage;
