import path from 'path';
import { merge } from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import { Configuration } from 'webpack';
const CopyPlugin = require('copy-webpack-plugin');

const env = 'production';
const isProduction = env === 'production';

const config: Configuration = {
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/main.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  mode: isProduction ? 'production' : 'development',
  resolve: {
    alias: {
      "@config": path.resolve(__dirname, "config"),
      "src": path.resolve(__dirname, "src"),
    },
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: isProduction
          ? [/node_modules/, /src\/swagger/]
          : /node_modules/,
      },
      {
        test: /\.yaml$/,
        loader: 'yaml-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-proposal-class-properties',
                'babel-plugin-syntax-dynamic-import',
                { loose: true },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: `env/development.env`,
          to: `development.env`,
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        minify: TerserPlugin.swcMinify,
        terserOptions: {
          compress: true,
        },
      }),
    ],
  },
};

export default merge(config, {
  mode: isProduction ? 'production' : 'development',
});
