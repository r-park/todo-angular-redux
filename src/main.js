import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngRedux from 'ng-redux';
import { combineReducers } from 'redux';

// Core
import { apiMiddleware } from './core/api';
import { taskActions, taskReducer } from './core/tasks';

// Router
import { routerConfig } from './router';

// Views
import { App, AppDirective } from './views/app';
import { escapeDirective, focusDirective } from './views/common/directives';
import { Tasks, TasksDirective, TaskForm, TaskFormDirective, TaskItem, TaskItemDirective } from './views/tasks';

// Styles
import './styles/styles.scss';


let app = angular.module('app', [
  ngRedux,
  uiRouter
])

  .factory('apiMiddleware', apiMiddleware)
  .value('taskActions', taskActions)

  .controller('App', App)
  .directive('app', AppDirective)

  .controller('Tasks', Tasks)
  .directive('tasks', TasksDirective)

  .controller('TaskForm', TaskForm)
  .directive('taskForm', TaskFormDirective)

  .controller('TaskItem', TaskItem)
  .directive('taskItem', TaskItemDirective)

  .directive('escape', escapeDirective)
  .directive('focus', focusDirective)

  .config(['$ngReduxProvider', $ngReduxProvider => {
    $ngReduxProvider.createStoreWith(combineReducers({
      tasks: taskReducer
    }), ['apiMiddleware']);
  }])

  .config(routerConfig);


angular.element(document).ready(() => {
  angular.bootstrap(document, [app.name], {strictDi: true});
});
