import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="CMOA Collection Search"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' }
      ]}
    />
    <NavBar />
    <main>{children()}</main>
    <Footer />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func.isRequired
};

export default TemplateWrapper;
