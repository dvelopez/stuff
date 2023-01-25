const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const Webpack = require("webpack");

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    
    devServer: {
        port: 8080,
        watchFiles: ["./src/*"],
        open: true,
        hot: true,
    },


    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    { loader: process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
                ]
            }
        ]
    },

    devtool: 'source-map',

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['es', 'ca', 'en'],
        }),
        new Webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /es|ca|en/),
    ]
}