import uiRouter from 'angular-ui-router';
import ngRedux from 'ng-redux';
import createLogger from 'redux-logger';

// Core
import { apiMiddleware } from './core/api';
import { taskActions, taskReducer } from './core/tasks';

// Router
import { routerConfig } from './router';

// Views
import { AppComponent } from './views/app';
import { escapeDirective, focusDirective } from './views/common/directives';
import { TaskFormComponent, TaskItemComponent, TasksComponent } from './views/tasks';

// Styles
import './styles/styles.scss';


let app = angular.module('app', [
  ngRedux,
  uiRouter
])

  .factory('apiMiddleware', apiMiddleware)
  .value('taskActions', taskActions)

  .component('app', AppComponent)
  .component('taskForm', TaskFormComponent)
  .component('taskItem', TaskItemComponent)
  .component('tasks', TasksComponent)

  .directive('escape', escapeDirective)
  .directive('focus', focusDirective)

  .config(routerConfig)

  .config(['$ngReduxProvider', $ngReduxProvider => {
    const middleware = ['apiMiddleware'];

    if (process.env.NODE_ENV === 'development') {
      middleware.push(createLogger({
        level: 'info',
        collapsed: true
      }));
    }

    $ngReduxProvider.createStoreWith({
      tasks: taskReducer
    }, middleware);
  }]);


angular.element(document).ready(() => {
  angular.bootstrap(document, [app.name], {strictDi: true});
});
