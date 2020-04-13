const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const isDev = !isProduction;
const port = 4200;
const optimization = () => {
    const config = {
        splitChunks : {
            chunks : 'all',
        },
    };

    if ( isProduction ) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
        ];
    }

    return config;
};

module.exports = {
    context : path.resolve( __dirname, 'src' ),
    mode    : isProduction ? 'production' : 'development',
    entry   : './index.js',
    output  : {
        filename : '[name].[hash].js',
        path     : path.resolve( __dirname, 'dist' ),
    },
    devServer : {
        port,
        hot : isDev,
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
            {
                test : /\.css$/,
                use  : [
                    {
                        loader  : MiniCssExtractPlugin.loader,
                        options : {
                            hmr       : isDev,
                            reloadAll : true,
                        },
                    }, 
                    'css-loader',
                ],
            },
            {
                test : /\.(sass|scss)$/,
                use  : [
                    {
                        loader  : MiniCssExtractPlugin.loader,
                        options : {
                            hmr       : isDev,
                            reloadAll : true,
                        },
                    }, 
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    optimization : optimization(),
    plugins      : [
        new HtmlWebpackPlugin( {
            template : './index.html',
            minify   : {
                collapseWhitespace : isProduction,

            },
        } ),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin( {
            filename : '[name].[hash].css',
        } ),
    ],
};