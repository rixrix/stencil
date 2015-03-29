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

## Development Workflow

This boilerplate comes with a simple and running example found in `app/main` folder. Check the following files and folders when you want to add another functionality.

* `app/stencil.ts` - Include your new AngularJS controller, its module name and possibly add the route to your new controller and template.
* `app/styles/index.styl` - If you want to use `Stylus` for your CSS styling then update this file, otherwise just use a regular CSS file and leave this file as is.

## Todos

* Add TypeScript linter
* Finish my Stylus linter
* Minify
* Generate package for production deployment
* Deployment tasks for eg. S3 bucket, Heroku
* Push as npm package

## Motivation

### Why not use [MEAN](mean.io/) or [Yeoman](http://yeoman.io/)

I don't use any of those, besides I'd like to learn how to use these technologies. I want something I could use for playground and at the same time use for production deployment.

## Resources

A list of resources where I took some of the ideas and inspiration

* Relational Folder Structure http://w2ui.com/web/blog/10/Folder-Structure-for-Single-Page-Applications
* Gulp task names https://github.com/mrkev/generator-typescript

## License

MIT
