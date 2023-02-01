const path = require("path"); // we cannot use import key word in webpack so going the old ways
module.exports = {
  entry: "./src/index.js", //webpack entry point, webpack will start build process from this file
  output: {
    // file which will be generated as a result of the build process
    filename: "bundle.js", // this generates bundle.js file in dist folder
    // path: "./dist", this will not work as absolute path is required not relative path
    path: path.resolve(__dirname, "./dist"),
    // publicPath: "dist/", // it will for static assests in dist folder, this case is bydefault hanlded by webpack 5, no need to specifically mention here
    // publicPath: "https://some-cdn.com", it will look for images at this location
    publicPath: "dist/", // it tells from where the assests should be taken from, in webpack 5 it is by default set to publicPath: "auto"
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
    ],
  },
};
