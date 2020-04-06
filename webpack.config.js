const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const path = require('path');
const isProduction = false;

module.exports = {
    mode   : isProduction ? 'production' : 'development',
    entry  : './src/index.js',
    output : {
        filename : 'app.js',
        path     : path.resolve( __dirname, 'dist' ),
    },
    module : {
        rules : [
            {
                test   : /\.vue$/,
                loader : 'vue-loader',
            },
        ],
    },
    plugins : [
        new HtmlWebpackPlugin( {
            template : './src/index.html',
        } ),
        new VueLoaderPlugin(),
    ],
};