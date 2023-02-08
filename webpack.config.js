const path = require("path"); // we cannot use import key word in webpack so going the old ways
const TerserPlugin = require("terser-webpack-plugin"); // it comes with webpack 5, we donot need to install it explicitly
const MiniCssExtractPlugin  = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/index.js", //webpack entry point, webpack will start build process from this file
  output: {
    // file which will be generated as a result of the build process
    // filename: "bundle.js", // this generates bundle.js file in dist folder
    filename: "bundle.[contenthash].js",// content hash creates filename with new name every time, provided content has changed this is helpful in caching
    // path: "./dist", this will not work as absolute path is required not relative path
    path: path.resolve(__dirname, "./dist"),
    // publicPath: "dist/", // it will for static assests in dist folder, this case is bydefault hanlded by webpack 5, no need to specifically mention here
    // publicPath: "https://some-cdn.com", it will look for images at this location
    publicPath:"",
    // publicPath: "dist/", // it tells from where the assests should be taken from, in webpack 5 it is by default set to publicPath: "auto"
  //  clean:true ,// for cleaning webpack before each build, this is inbuild webpack feature we donot need to use any plugin in this case like clean-webpack-plugin
// clean:{
//   //other options for clean
//   dry:true,
//   keep:/\.css/, // remove exept .css files,
// }  
},

  mode: "none",
  module: {
    // we will write rules that will tell webpack how to import image files
    rules: [
      {
        test: /\.(png|jpg)$/, // regular expression that checks if filename contains png or jpg
        // for loaders we have use and for assets we have type, type can be one of four values
        //    1. asset/resource: creates a separate file for each assests and exports the url of each file, used for importing large files
        //    2. asset/inline: injects the base64 format of assest directly into the bundle, used for importing small files
        //    3. asset: combination of above two
        //    4.asset/source

        // type: "asset/resource", preferred for big files, size>8kb
        // type: "asset/inline", // preferred for small files like svg size <8kb, it creates the base 64 format of the file and inject it directly into the output budle therby increasing its size
        type: "asset", // webpack will decide what to apply between above two based upon the file size
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, // changed the webpack default 8kb check for small and large files to 3 kb
          },
        },
      },

      {
        // rule for text files
        test: /\.txt/,
        type: "asset/source",
      },
      {
        // rule for importing css files, here we will use loaders instead of asset module so we will use keyword use instead of type 
        // this rule tells webpack to use css loader and style loader we desire to import css file
        test: /\.css$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,//to use MiniCssExtractPlugin plugin to generate separate css file bundle
         "css-loader"]
      },
      {
        test:/\.scss$/, 
   use: [
    // "style-loader",
    MiniCssExtractPlugin.loader, //to use MiniCssExtractPlugin plugin to generate separate css file bundle
         "css-loader",
         "sass-loader" ], // loaders  are invoked from right to left so firt sass loader then css loader then style loader
      },
      {
        test:/\/.js$/,
        exclude:/node_modules/, // applies to all js files except located inside node modules
        use:{
          loader:'babel-loader',
          options:{ // we can extra options to every loader provided it support that option
            preset: ["@babel/env"], // compoles ecmascript above 5 to 5
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      }
    ],
  },

  plugins:[
    new TerserPlugin(),
    new MiniCssExtractPlugin({  // to create separate bundle for css files, instead of putting it inside bundle.js. This is done to reduce bundle size and load application faster as both these new files will be downloaded in parallel
      filename:'styles.[contenthash].css' // we can any name to css file, we need to change  the rule for css and scss style loadera 
    }),
    new CleanWebpackPlugin(), // to remove redundant bundle.js and css files,created due to content hash, before creating new build
   new HtmlWebpackPlugin(), //to dynamically create index.html file as we need to have different path names for js and css files, this actualli create index.html in dist folder itself 
                            // we also need tpo change public path option  as js  and css files always starts with trhe public path option
                            // since it is located at the same level we donot need anything in ahead of path
  ]
};
