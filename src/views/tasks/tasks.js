import { Component } from 'src/utils';


@Component({
  controllerAs: 'tasks',
  template: `
    <div class="g-row">
      <div class="g-col">
        <task-form create-task="tasks.actions.createTask(title)"></task-form>
      </div>

      <div class="g-col">
        <ul class="task-filters">
          <li><a ui-sref-active-eq="active" ui-sref="app.tasks({filter: ''})">View All</a></li>
          <li><a ui-sref-active="active" ui-sref="app.tasks({filter: tasks.filterTypes.active})">Active</a></li>
          <li><a ui-sref-active="active" ui-sref="app.tasks({filter: tasks.filterTypes.completed})">Completed</a></li>
        </ul>
      </div>

      <div class="g-col">
        <div class="task-list">
          <task-item
            model="task"
            delete-task="tasks.actions.deleteTask(task)"
            update-task="tasks.actions.updateTask(task)"
            ng-repeat="task in tasks.list | filter:tasks.filter track by $index"></task-item>
        </div>
      </div>
    </div>
  `
})

export class TasksComponent {
  static $inject = [
    '$ngRedux',
    '$scope',
    '$stateParams',
    'taskActions'
  ];

  constructor($ngRedux, $scope, $stateParams, taskActions) {
    const disconnect = $ngRedux.connect(state => ({
      tasks: state.tasks
    }), taskActions)((state, actions) => {
      if (!state.tasks.isLoaded) actions.fetchTasks();
      this.actions = actions;
      this.list = state.tasks.list;
    });

    $scope.$on('$destroy', disconnect);

    this.filterTypes = {active: 'active', completed: 'completed'};
    this.filter = $stateParams.filter;
  }

  get filter() {
    return this._filter;
  }

  set filter(value) {
    const { active, completed } = this.filterTypes;
    switch (value) {
      case active:
        this._filter = {completed: false};
        break;

      case completed:
        this._filter = {completed: true};
        break;

      default:
        this._filter = {};
    }
  }
}
