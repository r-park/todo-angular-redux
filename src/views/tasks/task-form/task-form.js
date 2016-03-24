import template from './task-form.html';


export const TaskFormComponent = {
  bindings: {
    createTask: '&'
  },
  controllerAs: 'taskForm',
  restrict: 'E',
  scope: {},
  template,
  controller: class TaskForm {
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
}