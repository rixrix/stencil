
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

var paths = {
    ts: 'app/**/*.ts',
    build: './build/app',
    dist: './dist',
    html: 'app/index.html',
    templates: 'app/modules/**/*.html',
    css: ['app/assets/**/*.css'],
    fonts: ['app/assets/**/*.eot', 'app/assets/**/*.svg', 'app/assets/**/*.ttf', 'app/assets/**/*.woff'],
    assets: ['app/assets/**/*.*'],
    image: ['app/assets/**/*.png', 'app/assets/**/*.jpg', 'app/assets/**/*.gif']
};

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
        .pipe(concat('index.html'))
        .pipe(gulp.dest(paths.build));
});

gulp.task('copy-assets', function() {
    return gulp.src(paths.assets)
        .pipe(gulp.dest(paths.build + '/assets'));
});

gulp.task('copy-css', function() {
    return gulp.src(paths.css)
        .pipe(concat('compiled.stencil.css'))
        .pipe(gulp.dest(paths.build));
});

function browserifier() {
    return browserify(paths.build + '/stencil.js', {
        fullPaths: false,
        cache: {},
        packageCache: {},
        debug: true
    });
}
gulp.task('browserify', function(){
    return browserifier()
    .bundle()
    .pipe(source('compiled.stencil.js'))
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
            .pipe(source('compiled.stencil.js'))
            .pipe(gulp.dest(paths.build));
    }

    return rebundle();
});

gulp.task('compile-templates', function() {
    return gulp.src([paths.templates])
        .pipe(minifyHTML())
        .pipe(templateCache({
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
    gulp.watch(paths.build + '/**/*.css')
        .on('change', livereload.changed);
    gulp.watch(paths.build + '/stencil.js')
        .on('change', livereload.changed);
    gulp.watch(paths.build + '/index.html')
        .on('change', livereload.changed);

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
        paths.build + '/index.html',
        paths.build + '/compiled.stencil.css',
        paths.build + '/compiled.stencil.js'
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