const path = require('path');

module.exports = {
  entry: "./static/rustw.ts",
  output: {
    filename: "rustw.out.js",
    path: path.resolve(__dirname, 'static'),
    libraryTarget: 'var',
    library: 'Rustw'
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'ts-loader'
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [ 'style-loader', 'css-loader' ]
    }]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './',
    publicPath: "/static/",
    port: 9000,
    watchContentBase: true
  },
}
