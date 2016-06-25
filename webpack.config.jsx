var webpack = require('webpack');
var path = require('path');
var nib = require('nib');
var fs = require('fs');

var options = {
    devtool: "inline-source-map",
    debug: true,
    cache: true,
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts'
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.css$/,
                loaders: ['style','css']
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    transforms: [
        function(file) {
            return fs.createReadStream(file);
        }
    ],
    stylus: {
        use: [nib()]
    },
    wrap: {
        strict: {
            before: [
                //'"use strict";'
            ]
        }
    },
    plugins: [

    ],
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
        alias: {
        },
        modulesDirectories: ['.', 'app', 'node_modules']
    },
    output: {
        path: '/',
        filename: 'main.js'
    }
};

module.exports = options;