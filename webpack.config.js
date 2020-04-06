const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');
const isProduction = false;

module.exports = {
    context : path.resolve( __dirname, 'src' ),
    mode    : isProduction ? 'production' : 'development',
    entry   : './index.js',
    output  : {
        filename : 'app.js',
        path     : path.resolve( __dirname, 'dist' ),
    },
    module : {
        rules : [
            {
                test   : /\.vue$/,
                loader : 'vue-loader',
            },
            {
                test   : /\.js$/,
                loader : 'babel-loader',
            },
        ],
    },
    plugins : [
        new HtmlWebpackPlugin( {
            template : './index.html',
        } ),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
    ],
};