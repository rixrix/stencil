var path = require('path');

var clean = require("gulp-clean");
var express = require('express');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var util = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var _ = require('lodash');
var exec = require('child_process').exec;
var karma = require('karma');

var appIndexHtmlFilename = 'index.html';
var appProjectName = 'stencil';
var compiledJsFilename = appProjectName + '.compiled.js';

var webServerPort = 3000;
var proxyServerPort = 3001;
var isPackageRun = false;
var isPackageRelease = false;
var isExpressOnProxyServer = false;

var sources = {
    ts: 'app/**/*.ts',
    build: './build/app',
    dist: './dist/app',
    html: 'app/' + appIndexHtmlFilename,
    assets: [
        'app/assets/**/*.*'
    ]
};

/***********************************************************************************************************************
 * Private Utilities
 **********************************************************************************************************************/

gulp.task('clean', function() {
    return gulp.src([
        sources.build,
        sources.dist
    ], {
        read: false
    })
    .pipe(clean());
});

gulp.task('start-server', function() {
    var server = express();
    var port = isExpressOnProxyServer ? proxyServerPort : webServerPort;

    server.get('/', function(request, response) {
        response.sendFile(path.join(__dirname, '/', sources.html));
    })
    .use(express.static(path.resolve(__dirname)))
    .listen(port);

    if (!isExpressOnProxyServer) {
        util.log('express @ http://localhost:' + port);
    }
});

gulp.task('webpack-dev-server', function() {
    var options = require('./webpack.config');

    options.entry = [];
    options.entry.push('reflect-metadata/Reflect');
    options.entry.push('core-js/client/shim.min');
    options.entry.push('zone.js/lib/zone');
    options.entry.push('app/' + appProjectName + '.ts');
    options.entry.push('webpack-dev-server/client?http://localhost:' + webServerPort, 'webpack/hot/dev-server');
    options.plugins.push(new webpack.HotModuleReplacementPlugin());

    var devServerOptions = {
        hot: true,
        watchDelay: 300,
        stats: {
            cached: false,
            cachedAssets: false,
            colors: true,
            context: __dirname
        },
        proxy: {
            '*': "http://localhost:" + proxyServerPort
        }
    };

    var webpackServer = new WebpackDevServer(webpack(options), devServerOptions);

    webpackServer.listen(webServerPort, function () {
        util.log("webpack @ http://localhost:" + webServerPort)
    });
});

gulp.task('karma-server', function(doneCB) {
    var server = new karma.Server({
        configFile: __dirname + '/karma.conf.js'
    }, doneCB);

    server.start();
});

/***********************************************************************************************************************
 * Copy-ish Tasks
 **********************************************************************************************************************/

gulp.task('copy-index-html', function() {
    return gulp.src(sources.html)
    .pipe(gulp.dest(isPackageRelease ? sources.dist : sources.build));
});

gulp.task('copy-assets', function() {
    return gulp.src(sources.assets, {
        base: 'assets'
    })
    .pipe(gulp.dest(path.join(isPackageRelease ? sources.dist : sources.build)));
});

/***********************************************************************************************************************
 * Transpiler Tasks
 **********************************************************************************************************************/

gulp.task('webpackify', function(callback) {
    var webpackOptions = require('./webpack.config');
    var outputPath = isPackageRelease ? sources.dist : sources.build;

    webpackOptions.entry = {
        stencil: [
            'reflect-metadata/Reflect',
            'core-js/client/shim.min',
            'zone.js/lib/zone',
            'app/' + appProjectName + '.ts'
        ]
    };

    webpackOptions.output = {
        filename: path.join(outputPath, '/', compiledJsFilename)
    };

    webpack(webpackOptions, function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
            callback();
        }
    });
});

/***********************************************************************************************************************
 * Public Tasks
 **********************************************************************************************************************/

gulp.task('build', function() {
    runSequence(
        'clean',
        [
            'copy-assets',
            'copy-index-html'
        ],
        'webpackify'
    );
});

gulp.task('run', function() {
    runSequence(
        'start-server'
    );
});

gulp.task('watchrun', function() {
    isExpressOnProxyServer = true;
    runSequence(
        'run',
        'webpack-dev-server'
    );
});

gulp.task('release', function() {
    isPackageRelease = true;
    runSequence(
        'clean',
        [
            'copy-assets',
            'copy-index-html'
        ],
        'webpackify'
    );
});

gulp.task('releaserun', function() {
    isPackageRun = true;
    isPackageRelease = true;
    runSequence(
        'release',
        'run'
    );
});

gulp.task('runtest', function(doneCB) {
    var cmd = process.platform === 'win32' ?
        'node_modules\\.bin\\karma run ' :
        'node node_modules/.bin/karma run ';

    runSequence('karma-server', function() {
        cmd += 'karma.conf.js';
        exec(cmd, function(e, stdout) {
            // ignore errors, we don't want to fail the build in the interactive (non-ci) mode
            // karma server will print all test failures
            doneCB();
        });
    });
});

gulp.task('default', ['watchrun']);