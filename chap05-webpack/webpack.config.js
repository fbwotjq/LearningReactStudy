let webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + "/dist/assets",
        filename: "bundle.js",
        sourceMapFilename: 'bundle.map'
    },
    devtool: '#source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'stage-0', 'react']
                }
            }
        ]
    },
    mode: 'none',
    plugins: [
        new UglifyJsPlugin({
            sourceMap: true
        })
    ]
}