const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './build.js',
  output: {
    filename: 'wp-simple-api-reader.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        ie8: true,
        ecma: 8,
        mangle: true,
        output: {
          comments: false,
          beautify: false,
        },
        compress: true,
        warnings: false
      }
    })
  ]
};
