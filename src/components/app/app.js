import template from './app.html';


export function AppDirective() {
  return {
    controller: 'App',
    controllerAs: 'app',
    restrict: 'E',
    template
  };
}


export class App {}
