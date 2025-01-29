import path from 'path';
import { merge } from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import { Configuration } from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';

// Set the environment
const env = process.env.NODE_ENV || 'production';
const isProduction = env === 'production';

// Base Webpack configuration
const baseConfig: Configuration = {
  target: 'node', // Target Node.js runtime
  externals: [nodeExternals()], // Exclude node_modules
  entry: './src/main.ts', // Application entry point
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: '[name].js', // Output filenames
    chunkFilename: '[name].js', // Output chunk filenames
    publicPath: '/', // Public path for assets
  },
  mode: isProduction ? 'production' : 'development', // Webpack mode
  resolve: {
    alias: {
      '@config': path.resolve(__dirname, 'config'), // Config alias
      src: path.resolve(__dirname, 'src'), // Src alias
    },
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.jsx'], // File extensions
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Match TypeScript files
        loader: 'ts-loader',
        exclude: isProduction
          ? [/node_modules/, /src\/swagger/] // Exclude swagger in production
          : /node_modules/,
      },
      {
        test: /\.yaml$/, // Match YAML files
        loader: 'yaml-loader',
      },
      {
        test: /\.(js|jsx)$/, // Match JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-proposal-class-properties',
                { loose: true },
              ],
              'babel-plugin-syntax-dynamic-import',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean the output directory
    new CopyPlugin({
      patterns: [
        {
          from: `env/${isProduction ? 'production' : 'development'}.env`,
          to: `${isProduction ? 'production' : 'development'}.env`,
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true, // Use multiple threads
        minify: TerserPlugin.swcMinify, // Use SWC minification
        terserOptions: {
          compress: true,
        },
      }),
    ],
  },
};

// Merged Webpack configuration
const finalConfig: Configuration = merge(baseConfig, {
  mode: isProduction ? 'production' : 'development',
});

export default finalConfig;
