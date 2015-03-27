var path = require('path');

var gulp = require('gulp');
var clean = require("gulp-clean");
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var util = require('gulp-util');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var express = require('express');
var livereload = require('gulp-livereload');
var templateCache = require('gulp-angular-templatecache');
var minifyHTML = require('gulp-minify-html');
var livereloadInjector = require('connect-livereload');
var concat = require('gulp-concat');


var boilerPlateName = 'stencil';
var compiledJsTemplateFilename = 'templates.js';
var stencilJsFilename = boilerPlateName + '.js';
var compiledStencilJsFilename = 'compiled.' + stencilJsFilename;
var compiledStencilCssFilename = 'compiled.' + boilerPlateName + '.css';
var appIndexHtmlFilename = 'index.html';

var paths = {
    ts: 'app/**/*.ts',
    build: './build/app',
    dist: './dist',
    html: 'app/' + appIndexHtmlFilename,
    templates: [
        'app/**/*.html',
        '!app/assets/**/*.html'
    ],
    css: [
        'app/assets/**/*.css'
    ],
    fonts: [
        'app/assets/**/*.eot',
        'app/assets/**/*.svg',
        'app/assets/**/*.ttf',
        'app/assets/**/*.woff'
    ],
    assets: [
        'app/assets/**/*.*'
    ],
    image: [
        'app/assets/**/*.png',
        'app/assets/**/*.jpg',
        'app/assets/**/*.gif'
    ]
};

function browserifier() {
    return browserify(paths.build + '/' + stencilJsFilename, {
        fullPaths: false,
        cache: {},
        packageCache: {},
        debug: true
    });
}

function reload(event) {
    setTimeout(function() {
        livereload.changed();
        util.log('[reloaded] ' + path.basename(event.path));
    }, 2000);

}

gulp.task('compile-typescript', function() {
    return gulp.src(paths.ts)
        .pipe(ts({
            module: 'commonjs'
        }))
        .pipe(gulp.dest(paths.build));
});

gulp.task('clean', function() {
    return gulp.src([paths.build, paths.dist], {read: false})
        .pipe(clean());
});

gulp.task('copy-html', function() {
    return gulp.src(paths.html)
        .pipe(concat(appIndexHtmlFilename))
        .pipe(gulp.dest(paths.build));
});

gulp.task('copy-assets', function() {
    return gulp.src(paths.assets)
        .pipe(gulp.dest(path.join(paths.build, '/assets')));
});

gulp.task('copy-css', function() {
    return gulp.src(paths.css)
        .pipe(concat(compiledStencilCssFilename))
        .pipe(gulp.dest(paths.build));
});

gulp.task('browserify', function(){
    return browserifier()
    .bundle()
    .pipe(source(compiledStencilJsFilename))
    .pipe(gulp.dest(paths.build));
});

gulp.task('watchify', function() {

    var browseritor = watchify(
        browserifier()
    );

    browseritor.on('update', rebundle);

    function rebundle() {
        return browseritor.bundle()
            .on('error', util.log.bind(util, 'Browserify Error'))
            .pipe(source(compiledStencilJsFilename))
            .pipe(gulp.dest(paths.build));
    }

    return rebundle();
});

gulp.task('compile-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(templateCache(
            compiledJsTemplateFilename, {
            module: 'Templates',
            moduleSystem: 'Browserify',
            standalone: true
        }))
        .pipe(gulp.dest(paths.build));
});

gulp.task('watches', function() {

    gulp.watch(paths.html, ['copy-html']);
    gulp.watch(paths.css, ['copy-css']);
    gulp.watch(paths.ts, ['compile-typescript']);
    gulp.watch(paths.templates, ['compile-templates']);

    // post-build watcher(s)
    gulp.watch([
        path.join(paths.build, compiledStencilCssFilename),
        path.join(paths.build, compiledStencilJsFilename),
        path.join(paths.build, appIndexHtmlFilename)
    ], {
        debounceDelay: 1000
    })
    .on('change', function(event) {
        reload(event);
    });
});

gulp.task('start-livereload', function(){
    livereload.listen();
});

gulp.task('start-server', function() {
    var server = express();

    server.use(livereloadInjector());
    server.use(express.static(paths.build));
    server.listen(3000);
});

gulp.task('copy-images', function(){
    return gulp.src(paths.image)
        .pipe(gulp.dest(paths.build + '/img'));
});

gulp.task('copy-builds-to-dist', function(){
    gulp.src([
        path.join(paths.build, appIndexHtmlFilename),
        path.join(paths.build, compiledStencilCssFilename),
        path.join(paths.build, compiledStencilJsFilename)
    ])
    .pipe(gulp.dest(paths.dist));

    gulp.src([paths.build + '/img/**/*'])
    .pipe(gulp.dest(paths.dist + '/img'));
});

gulp.task('dev', function() {
    runSequence(
        'clean',
        'copy-assets',
        'copy-html',
        'copy-css',
        'copy-images',
        'compile-typescript',
        'compile-templates',
        'watchify',
        'start-livereload',
        'start-server',
        'watches'
    );
});

gulp.task('deploy', function() {
    runSequence(
        'clean',
        'copy-assets',
        'copy-html',
        'copy-css',
        'copy-images',
        'compile-typescript',
        'compile-templates',
        'browserify',
        'copy-builds-to-dist'
    );

});

gulp.task('default', ['dev']);