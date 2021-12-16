const path = require('path');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    moon_rocket: './src/frontend/moon_rocket.jsx',
    vendors: './src/frontend/assets/vendors.js',
    styles: './src/frontend/assets/styles/main.scss'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname + '/dist', 'public'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname + '/src', 'frontend'),
        use: ['babel-loader']
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'css/[name].css'
        },
        use: [
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: ['./node_modules/'],
  },
  plugins: [
      new FixStyleOnlyEntriesPlugin()
  ]
};
