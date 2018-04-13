const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path');

const extractLess = new ExtractTextPlugin({
  filename: 'static/css/[name].[contenthash].css',
  // disable: process.env.NODE_ENV === 'development', // disabled during development
})

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.less$/,
            use: extractLess.extract({  // use the ExtractTextPlugin instance
              use: [
                {
                  loader: 'css-loader',
                },
                {
                  loader: 'less-loader',
                },
              ],
              // use style-loader in development
              fallback: 'style-loader',
            }),
          },
        ],
      },
      plugins: [
        ...config.plugins,
        extractLess // <- Add the ExtractTextPlugin instance here
      ],
      resolve: {
        ...config.resolve,
        modules: [
          path.resolve('src'),
          'node_modules'
        ],
        alias: {
          IntlFormat: 'modules/Intl/IntlFormat',
        }
      }
    }
  },
}