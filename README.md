## Stencil

A horribly simple boilerplate for frontend development using some good WWW stuff today!

## Technologies

* [GulpJS](http://gulpjs.com/)
* [TypeScript](http://www.typescriptlang.org/)
* [AngularJS](https://angular.io/)
* [Browserify](http://browserify.org/)
* [NodeJS](https://nodejs.org/)
* [Livereload](https://github.com/mklabs/tiny-lr)
* [ExpressJS](http://expressjs.com/)
* [Stylus](http://learnboost.github.io/stylus/)
* Plus other stuff like:
* - [Watchify](https://github.com/substack/watchify)
* - [DefinitelyTyped](http://definitelytyped.org/tsd/)
* - [Bootstrap Stylus](https://www.npmjs.com/package/bootstrap-styl)

## Install

Make sure you have NodeJS and Git, then

```
$ git clone https://github.com/rixrix/stencil.git
$ cd </path/to/stencil/cloned/folder>
$ npm install
```

## Usage

By default if you don't specify any parameter to Gulp it will invoke `watchrun` task

```
$ gulp
```

Build only:

```
$ gulp build
```

Run only:

```
$ gulp run
```

Automatically build when a file changes:

```
$ gulp watch
```

Automatically build and run when a file changes:

```
$ gulp watchrun
```

## License

MIT
