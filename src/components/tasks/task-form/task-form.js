import template from './task-form.html';


export function TaskFormDirective() {
  return {
    bindToController: {
      createTask: '&'
    },
    controller: 'TaskForm',
    controllerAs: 'taskForm',
    restrict: 'E',
    scope: {},
    template
  };
}


export class TaskForm {
  static $inject = [
    '$scope'
  ];

  constructor($scope) {
    this.scope = $scope;
    this.setTitle();
  }

  cancel() {
    this.setTitle();
  }

  setTitle() {
    this.title = '';
  }

  submit() {
    if (this.scope.newTaskForm.$valid) {
      this.createTask({title: this.title});
      this.setTitle();
    }
  }
}
