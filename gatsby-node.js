/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const Webpack = require('webpack');

exports.modifyWebpackConfig = ({ config }) => {
  config.loader('file-loader', {
    test: /\.(svg|png|jpg|gif|eot)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader',
    query: { name: '[folder]/[name].[ext]' }
  });

  config.loader('url-loader', {
    test: /\.(woff|woff2|otf|ttf)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader',
    query: { name: '[folder]/[name].[ext]', limit: 5000 }
  });

  config.plugin('webpack-define', Webpack.DefinePlugin, () => [
    {
      'process.env': {
        ELASTIC_ENDPOINT: JSON.stringify(process.env.ELASTIC_ENDPOINT)
      }
    }
  ]);

  return config;
};
