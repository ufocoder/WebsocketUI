module.exports = {
  entry: __dirname + '/src/app.jsx',
  output: {
    path: __dirname + '/public/assets/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(gif|png)$/,
        loader: 'url?limit=64000&name=images/[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=.&]+)?$/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ]
  }
};
