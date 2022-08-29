/**
 * COMMON WEBPACK CONFIGURATION
 */
const { getCommitHash, onHeroku, gitRevisionPlugin } = require('./utils');

const path = require('path');
const webpack = require('webpack');

const { EnvironmentPlugin } = webpack;

module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  output: {
    // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
    ...options.output,
  }, // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        exclude: /node_modules/,
        type: 'javascript/auto',
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },

      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: options.babelQuery,
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: options.mode === 'production' ? true : false,
            },
          },
        ],
      },

      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        type: 'javascript/auto',
        use: ['style-loader', 'css-loader'],
      },

      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        type: 'javascript/auto',
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        type: 'asset/resource',
      },

      // for inline query loading
      {
        resourceQuery: /file-loader/,
        type: 'asset/resource',
      },

      {
        test: /\.(mp4|webm)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // Inline files smaller than 10 kB
            maxSize: 10 * 1024,
          },
        },
      },

      {
        test: /\.svg$/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              maxSize: 10 * 1024,
            },
          },
        ],
      },

      {
        test: /\.(jpg|png|gif|jpeg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // Inline files smaller than 10 kB
            maxSize: 10 * 1024,
          },
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
            },
          },
        ],
      },

      {
        test: /\.html$/,
        type: 'javascript/auto',
        use: 'html-loader',
      },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),

    ...(onHeroku ? [] : [gitRevisionPlugin]),
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new EnvironmentPlugin({
      NODE_ENV: 'development',
      GIT_HASH: getCommitHash(),
      // add it in plugin because it is passed during build only, this makes it available during app start
      VERSION: process.env.VERSION,
    }),
  ]),
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
    fallback: {
      stream: false,
      domain: false,
    },
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
