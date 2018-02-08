const bourbon = require('bourbon').includePaths;
const neat = require('bourbon-neat').includePaths;

module.exports = {
  siteMetadata: {
    title: 'CMOA Collection Search'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [bourbon, neat]
      }
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/things/*'] }
    }
  ]
};
