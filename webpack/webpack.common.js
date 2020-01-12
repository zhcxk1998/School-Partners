const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tsImportPluginFactory = require('ts-import-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  entry: path.join(__dirname, '../src/admin/index.tsx'),
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', 'json', '.ts', '.tsx'],
    alias: {
      '@': resolve('../src')
    }
  },
  module: {
    rules: [{
      test: /\.(jsx|tsx|js|ts)$/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        getCustomTransformers: () => ({
          before: [tsImportPluginFactory(
            {
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: "css"
            }
          )]
        }),
        compilerOptions: {
          module: 'es2015'
        }
      },
      exclude: /node_modules/
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: "postcss-loader",
          options: {
            plugins: (loader) => []
          }
        },
        'sass-loader',
      ],
    }, {
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader',
          options: { minimize: true },
        },
      ],
    }, {
      test: /\.(png|jpg|gif|jpeg|svg)/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 500,
          outputPath: 'images/',
        }
      }]
    }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../output'),
    filename: devMode ? '[name].[hash:8].js' : '[name].[chunkhash:8].js',
    chunkFilename: devMode ? '[name].[hash:8].js' : '[name].[chunkhash:8].js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};