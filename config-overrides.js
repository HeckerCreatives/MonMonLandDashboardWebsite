const webpack = require('webpack');
// const WebpackObfuscator = require('webpack-obfuscator');
// const HtmlWebpackPlugin = require("html-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url"),
        // "process": require.resolve("process/browser"),
    })
    config.resolve.fallback = fallback;
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
        new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
            const mod = resource.request.replace(/^node:/, "");
            switch (mod) {
                case "buffer":
                    resource.request = "buffer";
                    break;
                default:
                    throw new Error(`Not found ${mod}`);
            }
        }),
        // new HtmlWebpackPlugin({
        //     minify: {
        //       removeAttributeQuotes: true,
        //       collapseWhitespace: true,
        //       removeComments: true,
        //     },
        //   }),
       
        // new WebpackObfuscator(
        //     {
        //       // Add your obfuscation options here
        //       rotateStringArray: true,
        //     },
        //     // Add files you want to exclude from obfuscation
        //     []
        // ),
        new UglifyJsPlugin({
            uglifyOptions: {
              warnings: false,
              parse: {},
              compress: {},
              mangle: true, // Note mangle.properties is false by default.
              output: null,
              toplevel: false,
              nameCache: null,
              ie8: false,
              keep_fnames: false,
            },
        }),
        
          
    );
    return config;
}