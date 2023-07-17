const path = require("path");
const webpack = require('webpack'); // to access built-in plugins

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const CopyPlugin = require("copy-webpack-plugin");

const TerserPlugin = require('terser-webpack-plugin');  // webpack 5
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

//const LiveReloadPlugin = require("webpack-livereload-plugin");

const entryDirectory = "./index.js";
const outputDirectory = "./public/";  // public assests
const FromstaticFiles = "./assets";  // source assests folder
const TostaticFiles = "./public/assets"; // final build assets

const FromHtmlFiles = './*.html';  // source html files 

const config = {
    mode: 'production', // development

    devServer: {
      static: {
        directory: path.join(__dirname, '/'),  // '/' serve the site from root
      },
      compress: true,
      port: 4444,
    },

    entry: entryDirectory,
    output: {
        //path: path.resolve(process.cwd(), outputDirectory), //remove the files from build folder 
        path: path.resolve(__dirname, outputDirectory), // recreate the files from build folder
        filename: 'bundle.js',
        clean: true,
    },

    resolve: {
        extensions: ['.js', '.jsx', 'json'],
        preferAbsolute: true,
    },
    performance: {
        hints : false,
        maxEntrypointSize: 400000,
        maxAssetSize: 100000,
        assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
        }
    },

    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
        }),
        new CssMinimizerPlugin()
      ]
    },

    module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
          },  
          /*{
            test: /\.css$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" }
            ]
          },*/
          {
          test: /\.(sa|sc|c)ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              //'sass-loader',
              //'style-loader'
            ]
          },
          /*{
            test: /\.(svg|jpg|gif|png|eot|woff|woff2|ttf|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //dependency: { not: ['url'] },
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 20000000,
                  fallback: 'file-loader' 
                }
              }
            ],
            //type: 'javascript/auto'
          },*/
          {
            test: /\.(svg|jpg|gif|png|eot|woff|woff2|ttf|otf)$/, //  /\.(png|jpg|gif)$/i,
            type: 'asset'   //asset/resource   asset/inline
          }

        ]
     },

     plugins: [
        new CleanWebpackPlugin({
          outputDirectory,
          dry: true,
          verbose: true,
          cleanStaleWebpackAssets: true,
        }),

        new webpack.ProgressPlugin(),     
        new webpack.ProvidePlugin({
          process: 'process/browser',
        }),  

        new CopyPlugin({
          patterns: [
          //{ from: './src/**/*.html', to: './dist', force:true },  // copy all html files from src to dist
            {
              from: path.resolve(__dirname, FromstaticFiles), 
              to: path.resolve(__dirname, TostaticFiles) ,
              force:true,
              globOptions: {
                  dot: true,
                  gitignore: true,
                  ignore: ["**/css/**", "**/js/**", "**/fonts/**"],  // ignore few folders
                },
            },
          ],
          options: {
            concurrency: 100,
          },
        }),

        new HtmlWebpackPlugin({
          inject: true,
          hash: false,
          title: 'Webpack',
          filename: './index.html',  
          template: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CssMinimizerPlugin(),
        //new LiveReloadPlugin(),
    ] 

};


module.exports = config;