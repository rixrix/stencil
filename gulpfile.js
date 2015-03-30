var path = require('path');

var browserify = require('browserify');
var clean = require("gulp-clean");
var concat = require('gulp-concat');
var express = require('express');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var livereloadInjector = require('connect-livereload');
var minifyHTML = require('gulp-minify-html');
var runSequence = require('run-sequence');
var sourceStream = require('vinyl-source-stream');
var templateCache = require('gulp-angular-templatecache');
var ts = require('gulp-typescript');
var util = require('gulp-util');
var watchify = require('watchify');
var stylus = require('gulp-stylus');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');

var appIndexHtmlFilename = 'index.html';
var boilerPlateName = 'stencil';
var compiledJsTemplateFilename = 'templates.js';
var compiledStencilCssFilename =  boilerPlateName + '.compiled.css';
var compiledStencilJsFilename = boilerPlateName + '.compiled.js';
var stencilJsFilename = boilerPlateName + '.js';
var stencilCssFilename = boilerPlateName + '.css';

var expressServerPort = 3000;
var isWatchAndRun = false;
var isPackageRun = false;
var isPackageRelease = false;

var sources = {
    ts: 'app/**/*.ts',
    build: './build/app',
    dist: './dist/app',
    zip: './dist',
    html: 'app/' + appIndexHtmlFilename,
    templates: [
        'app/**/*.html',
        '!app/assets/**/*.html',
        '!app/' + appIndexHtmlFilename
    ],
    css: [
        'app/**/*.css'
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
    ],
    stylus: [
        'app/**/*.styl',
        'build/app/' + stencilCssFilename
    ]
};

/***********************************************************************************************************************
 * Local functions / Utilities
 **********************************************************************************************************************/

function browserifier() {
    return browserify(sources.build + '/' + stencilJsFilename, {
        fullsources: false,
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

gulp.task('clean', function() {
    return gulp.src([sources.build, sources.dist], {read: false})
    .pipe(clean());
});

gulp.task('start-livereload', function(){
    livereload.listen();
});

gulp.task('start-server', function() {
    var server = express();

    if (!isPackageRun) {
        server.use(livereloadInjector());
        server.use(express.static(sources.build));
    } else {
        server.use(express.static(sources.dist));
    }

    server.listen(expressServerPort);

    util.log(util.colors.green('Stencil is listening on port ' + expressServerPort));
});

gulp.task('browserify', function(){
    return browserifier()
    .bundle()
    .pipe(sourceStream(compiledStencilJsFilename))
    .pipe(gulp.dest(sources.build));
});

gulp.task('watchify', function() {

    var browseritor = watchify(
        browserifier()
    );

    browseritor.on('update', rebundle);

    function rebundle() {
        return browseritor.bundle()
        .on('error', util.log.bind(util, 'Browserify Error'))
        .pipe(sourceStream(compiledStencilJsFilename))
        .pipe(gulp.dest(sources.build));
    }

    return rebundle();
});

gulp.task('minify-js', function() {
    return gulp.src(path.join(sources.build, compiledStencilJsFilename))
    .pipe(uglify({
        mangle: true
    }))
    .pipe(gulp.dest(path.join(sources.dist, '/')));
});

gulp.task('minify-css', function() {
    return gulp.src(path.join(sources.build, compiledStencilCssFilename))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.join(sources.dist, '/')));
});

/***********************************************************************************************************************
 * Copy-ish Tasks
 **********************************************************************************************************************/

gulp.task('copy-index-html', function() {
    return gulp.src(sources.html)
    .pipe(gulp.dest(isPackageRelease ? sources.dist : sources.build));
});

gulp.task('copy-assets', function() {
    return gulp.src(sources.assets)
    .pipe(gulp.dest(path.join(isPackageRelease ? sources.dist : sources.build, '/assets')));
});

gulp.task('copy-css', function() {
    return gulp.src(sources.css)
    .pipe(concat(stencilCssFilename))
    .pipe(gulp.dest(isPackageRelease ? sources.dist : sources.build))
    .pipe(gulpif(isWatchAndRun, livereload()));
});

gulp.task('copy-images', function(){
    return gulp.src(sources.image)
    .pipe(gulp.dest(path.join(isPackageRelease ? sources.dist : sources.build, '/img')));
});

/***********************************************************************************************************************
 * Transpiler Tasks
 **********************************************************************************************************************/

gulp.task('compile-templates', function() {
    return gulp.src(sources.templates)
    .pipe(minifyHTML())
    .pipe(templateCache(
        compiledJsTemplateFilename, {
            module: 'Templates',
            moduleSystem: 'Browserify',
            standalone: true
        }))
    .pipe(gulp.dest(sources.build));
});

gulp.task('compile-typescript', function() {
    return gulp.src(sources.ts)
    .pipe(ts({
        module: 'commonjs'
    }))
    .pipe(gulp.dest(sources.build));
});

gulp.task('compile-stylus', function() {
    return gulp.src(sources.stylus)
    .pipe(stylus())
    .pipe(concat(compiledStencilCssFilename))
    .pipe(gulp.dest(sources.build))
    .pipe(gulpif(isWatchAndRun, livereload()));
});

/***********************************************************************************************************************
 * Bulk Tasks
 **********************************************************************************************************************/

gulp.task('watches', function() {

    gulp.watch(sources.html, ['copy-index-html']);
    gulp.watch(sources.stylus, ['compile-stylus']);
    gulp.watch(sources.ts, ['compile-typescript']);
    gulp.watch(sources.templates, ['compile-templates']);
    gulp.watch(sources.css, ['copy-css']);

    // post-build watcher(s)
    gulp.watch([
        path.join(sources.build, compiledStencilJsFilename),
        path.join(sources.build, appIndexHtmlFilename)
    ], {
        debounceDelay: 1000
    })
    .on('change', function(event) {
        if (isWatchAndRun) {
            reload(event);
        }
    });
});

/***********************************************************************************************************************
 * Common Tasks
 **********************************************************************************************************************/

gulp.task('build', function() {
    runSequence(
        'clean',
        [
            'copy-assets',
            'copy-index-html',
            'copy-images',
            'copy-css',
            'compile-typescript',
            'compile-templates'
        ],
        'compile-stylus',
        'browserify'
    );
});

gulp.task('run', function() {
    runSequence(
        'start-server'
    );
});

gulp.task('watch', function() {
    runSequence(
        'watchify',
        'watches'
    );
});

gulp.task('watchrun', function() {
    isWatchAndRun = true;

    runSequence(
        'clean',
        [
            'copy-assets',
            'copy-index-html',
            'copy-images',
            'copy-css',
            'compile-typescript',
            'compile-templates'
        ],
        'compile-stylus',
        'browserify',
        'watches',
        'watchify',
        'start-livereload',
        'run'
    );
});

gulp.task('release', function() {
    isPackageRelease = true;
    runSequence(
        'clean',
        [
            'copy-assets',
            'copy-index-html',
            'copy-images',
            'copy-css',
            'compile-typescript',
            'compile-templates'
        ],
        'compile-stylus',
        'browserify',
        'minify-js',
        'minify-css'
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

gulp.task('default', ['watchrun']);