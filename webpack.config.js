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
                loader: 'typescript-simple'
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass"
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
        new webpack.NormalModuleReplacementPlugin(/^.*\.(html|css)$/, function (request) {
            var relative = path.relative(__dirname, request.context);
            var splitPath = relative.split(path.sep);

            if (splitPath[0] !== 'app') {
                relative = splitPath.slice(1).join(path.sep);
                request.context = path.join(__dirname, relative);
            }
        })
    ],
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
        alias: {
        },
        modulesDirectories: ['.', 'app', 'node_modules']
    },
    output: {
        path: '/',
        filename: 'stencil.compiled.js'
    }
};

module.exports = options;