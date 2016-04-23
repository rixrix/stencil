# Stencil

A horribly simple starter template for all your Angular2 frontend development

## Technologies

[GulpJS](http://gulpjs.com/), [TypeScript](http://www.typescriptlang.org/), [Angular2](https://angular.io/),
[NodeJS](https://nodejs.org/), [ExpressJS](http://expressjs.com/), [Stylus](http://learnboost.github.io/stylus/),
[DefinitelyTyped](http://definitelytyped.org/tsd/), [Material Design Lite](https://www.getmdl.io/), [SCSS](http://sass-lang.com/),
[Webpack](https://webpack.github.io/)

## Install NPM dependencies

Make sure you already have NodeJS and Git installed, then

```
$ git clone https://github.com/rixrix/stencil.git
$ cd </path/to/stencil/cloned/folder>
$ npm install
```

## Gulp commands

By default if you don't specify any parameter it will invoke `watchrun`

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

## Application Structure

A strict application structure isn't enforced however keeping it simple gives more benefits in the long run.
You could try and follow what John Papa suggested in his [Angular2 Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a2/README.md)
called [LIFT](https://github.com/johnpapa/angular-styleguide/blob/master/a2/README.md#style-y140)

## Folder Structure

* Client: Core frontend and its components
* Server: Core server components

## License

Distributed under [MIT License](http://opensource.org/licenses/MIT)
