routerConfig.$inject = [
  '$stateProvider',
  '$urlRouterProvider'
];

export function routerConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state({
      abstract: true,
      name: 'app',
      views: {
        '': {
          template: '<app></app>'
        }
      }
    })

    .state({
      name: 'app.tasks',
      url: '/tasks?filter',
      views: {
        'main@app': {
          template: '<tasks></tasks>'
        }
      }
    });


  $urlRouterProvider.otherwise('/tasks');
}
