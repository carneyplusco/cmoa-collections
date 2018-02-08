module.exports = {
  siteMetadata: {
    title: 'CMOA Collection Search'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/things/*'] }
    }
  ]
};
