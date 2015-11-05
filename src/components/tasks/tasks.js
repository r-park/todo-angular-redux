import template from './tasks.html';


export function TasksDirective() {
  return {
    controller: 'Tasks',
    controllerAs: 'tasks',
    restrict: 'E',
    scope: {},
    template
  };
}


export class Tasks {
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

    this.filterType = $stateParams.filter;
    this.actions.fetchTasks();
  }
}
