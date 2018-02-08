module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/things/*`] },
    }
  ]
};
