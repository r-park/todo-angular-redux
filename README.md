[![Build Status](https://travis-ci.org/r-park/todo-angular-redux.svg?branch=master)](https://travis-ci.org/r-park/todo-angular-redux)


# Todo app with Angular 1.5 and Redux

- [Angular](https://github.com/angular/angular.js)
- [Angular UI-Router](https://github.com/angular-ui/ui-router)
- [NG-Redux](https://github.com/wbuchwalter/ng-redux)
- [Redux](https://github.com/rackt/redux)
- [Babel](https://github.com/babel/babel)
- [Gulp](https://github.com/gulpjs/gulp)
- [Karma](https://github.com/karma-runner/karma)
- [Node-SASS](https://github.com/sass/node-sass)
- [JSON-Server](https://github.com/typicode/json-server)
- [Webpack](https://github.com/webpack/webpack)


## Installing dependencies
```bash
$ npm install
```


#### Gulp v4 (optional)
```bash
$ npm install -g gulpjs/gulp-cli#4.0
```
The gulp tasks for this project require gulp v4-alpha. If you don't wish to globally install the v4 gulp-cli, you can run the gulp tasks using the locally installed gulp under `./node_modules/.bin` — for example:
```bash
$ ./node_modules/.bin/gulp run
```


## Developing
```bash
$ gulp
```
Executing the default `gulp` command will:
- Build the project
- Start the server at <a href="http://localhost:3000" target="_blank">localhost:3000</a>
- Watch for changes to the source files and process changes
- Live-reload the browser


## Testing
```bash
$ gulp test.watch
```
Executing `gulp test.watch` will:
- Run the test suites
- Watch for changes to the source files
- Re-run the tests whenever the sources are modified

For a single test run without auto-watch, execute `gulp test` instead.
