[![Build Status](https://travis-ci.org/r-park/todo-angular-redux.svg?branch=master)](https://travis-ci.org/r-park/todo-angular-redux)


# Todo app with Angular 1.5 and Redux

- [angular](https://github.com/angular/angular.js)
- [angular ui-router](https://github.com/angular-ui/ui-router)
- [ng-redux](https://github.com/wbuchwalter/ng-redux)
- [redux](https://github.com/rackt/redux)
- [babel](https://github.com/babel/babel)
- [karma](https://github.com/karma-runner/karma)
- [json-server](https://github.com/typicode/json-server)
- [webpack](https://github.com/webpack/webpack)


Quick Start
---------------

```shell
$ git clone https://github.com/r-park/todo-angular-redux.git
$ cd todo-angular-redux
$ npm install
$ npm start
```


Usage
-----

|Script|Description|
|---|---|
|`npm start`|Start webpack development server @ `localhost:3000` and api server @ `localhost:3001`|
|`npm run build`|Lint, test, and build the application to `./target`|
|`npm run lint`|Lint `.js` files|
|`npm run server:api`|Start api server @ `localhost:3001`|
|`npm run server:dev`|Start webpack development server @ `localhost:3000`|
|`npm test`|Run unit tests with Karma and Jasmine|
|`npm run test:watch`|Run unit tests with Karma and Jasmine; watch for changes to re-run tests|
