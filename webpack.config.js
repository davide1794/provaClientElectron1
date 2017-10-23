const config = {
  target: 'electron-renderer',
  context: __dirname,
  entry: { app: './app.js', vendor: [/*vendors*/]},
  cache: true,
  devtool: 'source-map',
  watch: false

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: ["node_modules"]
  },

  module: {

    rules: [
      {test: /\.html/, loader: 'html-loader'},
      {test: /worker\.js/, loader: 'worker-loader'},
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader?sourceMap", "less-loader?sourceMap"]
        })
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?sourceMap"
        })
      },
      {test: /\.(jpg|png|gif|jpeg|svg|otf|ttf|eot|woff)$/, loader: 'url-loader?limit=10000'}
    ]
  },

  plugins: [

    new ExtractTextPlugin('styles.[contenthash].css'),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['commons', 'vendor', 'manifest'],
      minChuncks: Infinity
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      hash: false,
      inject: 'head',
      cashe: true,
      showErrors: true
    })

  ],

  output: {
    publicPath: './',
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  }
};

module.exports = config;
