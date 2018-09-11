const webpack = require('webpack'),
path = require('path'),
HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: __dirname + '/src/javascript/root.js',
    output: {
        filename: 'app.bundle.js',
        path: __dirname + '/dist/',
        publicPath : '/'
    },
    resolve: {
        modules: ["node_modules", "bower_components"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Box shadow generator',
            template: __dirname + '/src/index.html',
            filename: __dirname + '/dist/index.html'
        })
    ],
    module: {
        rules: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader',
                options: {
                    'presets': ['babel-preset-es2015']
                }
            },
            {
                test: /node_modules/,
                loader: 'ify-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    },
    mode: 'production',
    devServer: {
        contentBase: './src',
        compress: true,
        headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY'
        },
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        port: 3000,
        publicPath: 'http://localhost:3000/',
        //hot: true,
        //inline: true
    },
};

module.exports = config;
