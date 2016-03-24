import { Component } from 'src/utils';


@Component({
  bindings: {
    createTask: '&'
  },
  controllerAs: 'taskForm',
  template: `
    <form class="task-form" name="newTaskForm" ng-submit="taskForm.submit()" novalidate>
      <input
        autocomplete="off"
        autofocus
        class="task-form__input"
        escape="taskForm.cancel()"
        maxlength="64"
        name="taskTitle"
        ng-model="taskForm.title"
        placeholder="What needs to be done?"
        required
        type="text">
    </form>
  `
})

export class TaskFormComponent {
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
