import uiRouter from 'angular-ui-router';
import ngRedux from 'ng-redux';
import { combineReducers } from 'redux';
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

  .config(['$ngReduxProvider', $ngReduxProvider => {
    const logger = createLogger({
      level: 'info',
      collapsed: true
    });

    $ngReduxProvider.createStoreWith(combineReducers({
      tasks: taskReducer
    }), ['apiMiddleware', logger]);
  }])

  .config(routerConfig);


angular.element(document).ready(() => {
  angular.bootstrap(document, [app.name], {strictDi: true});
});
