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
var replace = require('gulp-replace');
var transform = require('vinyl-transform');
var rename = require('gulp-rename');
var fs = require('fs');
var zip = require('gulp-vinyl-zip').zip;
var argv = require('yargs').argv;

var appIndexHtmlFilename = 'index.html';
var appProjectName = 'stencil';
var compiledAngularTemplateCacheFilename = 'templates.js';
var compiledCssFilename =  appProjectName + '.compiled.css';
var compiledJsFilename = appProjectName + '.compiled.js';
var appJsFilename = appProjectName + '.js';
var compiledShimVendorsJsFilename = 'vendors.js';
var fakeShimFilename = 'noop.js';
var zipArchiveFilename = 'archive.zip';

var expressServerPort = 3000;
var isWatchAndRun = false;
var isPackageRun = false;
var isPackageRelease = false;
var shimList = getConfigByKey('browserify-shim');
var isZip = !!argv.zip;

var sources = {
    ts: 'app/**/*.ts',
    build: './build/app',
    dist: './dist/app',
    zip: './dist',
    html: 'app/' + appIndexHtmlFilename,
    app: 'app/',
    templates: [
        'app/**/*.html',
        '!app/assets/**/*.html',
        '!app/' + appIndexHtmlFilename
    ],
    assets: [
        'app/assets/**/*.*'
    ],
    stylus: [
        'app/**/*.styl',
        'app/**/*.css'
    ]
};

/***********************************************************************************************************************
 * Local functions / Utilities
 **********************************************************************************************************************/

function browserifier() {
    var shim;
    var b = browserify(sources.build + '/' + appJsFilename, {
        fullsources: false,
        cache: {},
        packageCache: {},
        debug: isPackageRelease ? false : true
    });

    // NOTE
    // Exclude shim-ified libraries from the main app.
    // So we mark and tell browserify that these are external resources
    for(shim in shimList) {
        b.external(shim);
    }

    return b;
}

function reload(event) {
    setTimeout(function() {
        livereload.changed();
        util.log('[reloaded] ' + path.basename(event.path));
    }, 2000);
}

function getConfigByKey(key) {
    var config = require('./package.json');
    return config[key];
}

gulp.task('clean', function() {
    return gulp.src([
        sources.build,
        sources.dist,
        sources.zip
    ], {
        read: false
    })
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

    util.log(util.colors.green(appProjectName + ' is listening on port ' + expressServerPort));
});

gulp.task('browserify', function(){
    return browserifier()
    .bundle()
    .pipe(sourceStream(compiledJsFilename))
    .pipe(gulp.dest(sources.build));
});

gulp.task('watchify', function() {

    var browseritor = watchify(
        browserifier()
    );

    browseritor.on('update', rebundle);

    function rebundle() {
        return browseritor
        .bundle()
        .on('error', util.log.bind(util, 'Browserify Error'))
        .pipe(sourceStream(compiledJsFilename))
        .pipe(gulp.dest(sources.build));
    }

    return rebundle();
});

gulp.task('minify-js', function() {
    return gulp.src([
        path.join(sources.build, compiledJsFilename),
        path.join(sources.build, compiledShimVendorsJsFilename)
    ])
    .pipe(uglify({
        mangle: true
    }))
    .pipe(gulp.dest(path.join(sources.dist, '/')));
});

gulp.task('minify-css', function() {
    return gulp.src(path.join(sources.build, compiledCssFilename))
    .pipe(minifyCSS({
        keepSpecialComments: 0,
        advanced: true
    }))
    .pipe(gulp.dest(path.join(sources.dist, '/')));
});

gulp.task('browserify-vendors', function() {
    var shim;
    var noopJS = path.join(sources.app, fakeShimFilename);

    // HACK ALERT
    // create a fake entry point so that browserify will give us
    // a stream where we can require the shim-ified libraries
    fs.writeFile(noopJS, '');

    var browserified = transform(function(filename){
        var b = browserify(filename);

        for(shim in shimList) {
            b.require(shim);
        }

        return b.bundle();
    });

    return gulp.src(path.join(sources.app, fakeShimFilename))
    .pipe(browserified)
    .pipe(rename(compiledShimVendorsJsFilename))
    .pipe(gulp.dest(path.join(sources.build, '/')))
    .on('end', function() {
        // we named the shim file @ checck `compiledShimVendorsJsFilename`, thus it's safe to
        // delete the fake file after writing the contents to its destination folder
        fs.unlink(noopJS);
    });
});

gulp.task('zip', function() {
    var src = isPackageRelease ? sources.dist : sources.build;

    return gulp.src(path.join(src, '/**/*'))
    .pipe(zip(zipArchiveFilename))
    .pipe(gulp.dest(sources.zip))
});

/***********************************************************************************************************************
 * Copy-ish Tasks
 **********************************************************************************************************************/

gulp.task('copy-index-html', function() {
    return gulp.src(sources.html)
    .pipe(replace(/{%compiledCssFilename%}/, compiledCssFilename))
    .pipe(replace(/{%compiledJsFilename%}/, compiledJsFilename))
    .pipe(replace(/{%compiledShimVendorsJsFilename%}/, compiledShimVendorsJsFilename))
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

gulp.task('compile-templates', function() {
    return gulp.src(sources.templates)
    .pipe(minifyHTML())
    .pipe(templateCache(
        compiledAngularTemplateCacheFilename, {
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
    .pipe(concat(compiledCssFilename))
    .pipe(gulp.dest(isPackageRelease ? sources.dist : sources.build))
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
    gulp.watch(sources.assets, ['copy-assets']);

    // post-build watcher(s)
    gulp.watch([
        path.join(sources.build, compiledJsFilename),
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
            'compile-typescript',
            'compile-templates'
        ],
        'compile-stylus',
        'browserify-vendors',
        'browserify',
        function() {
            if (isZip) {
                runSequence('zip');
            }
        }
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
            'compile-typescript',
            'compile-templates'
        ],
        'compile-stylus',
        'browserify-vendors',
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
            'compile-typescript',
            'compile-templates'
        ],
        'compile-stylus',
        'browserify-vendors',
        'browserify',
        'minify-js',
        'minify-css',
        function() {
            if (isZip) {
                runSequence('zip');
            }
        }
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