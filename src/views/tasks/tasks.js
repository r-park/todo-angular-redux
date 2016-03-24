import template from './tasks.html';

export const TasksComponent = {
  controllerAs: 'tasks',
  restrict: 'E',
  template,
  controller: class Tasks {
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
        this.actions = actions;
        this.list = state.tasks.list;
      });

      $scope.$on('$destroy', disconnect);

      this.filterTypes = {active: 'active', completed: 'completed'};
      this.filter = $stateParams.filter;
      this.actions.fetchTasks();
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
}