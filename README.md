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

Build a minified version of your JavaScripts and CSS files
 
```
$ gulp release
```

Build and test run the minified version of your JavaScripts and CSS files 

```
$ gulp releaserun
```

For `run`, `watchrun` or `releaserun` tasks, navigate to the following URL:

```
http://localhost:3000
```

## Development Workflow

This boilerplate comes with a simple and running example found in `app/main` folder. 

However, check the following files and folders when you want to add another functionality.

* `app/<your-new-folder-here/>`
* `app/stencil.ts` - Include your new AngularJS controller, its module name and possibly add the route to your new controller and template.
* `app/styles/index.styl` - If you want to use `Stylus` for your CSS styling then update this file, otherwise just use a regular CSS file and leave this file as is.

## Todos

* Check [Todos](https://github.com/rixrix/stencil/issues)
* probably [MochaJS, ChaiJS and SinonJS](http://blog.codeship.com/mocha-js-chai-sinon-frontend-javascript-code-testing-tutorial/)

## Motivation

### Why not use [MEAN](mean.io/) or [Yeoman](http://yeoman.io/)

I don't use any of those, besides I'd like to learn how to use these technologies. I want something I could use for playground and at the same time use for production deployment.

## Need Help ?

File an issue https://github.com/rixrix/stencil/issues

## Want to help ?

Issue a pull request https://github.com/rixrix/stencil/pulls

## Resources

A list of resources where I took some of the ideas and inspiration

* Relational Folder Structure http://w2ui.com/web/blog/10/Folder-Structure-for-Single-Page-Applications
* Gulp task names https://github.com/mrkev/generator-typescript

## Warning

* Not tested on animals BUT only on MacOSX Yosemite

## License

MIT
