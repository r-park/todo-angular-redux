import template from './app.html';

export const AppComponent = {
    controllerAs: 'app',
    restrict: 'E',
    template,
    controller: class App {}
}