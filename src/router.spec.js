import 'angular';
import 'angular-mocks';
import uiRouter from 'angular-ui-router';
import { routerConfig } from './router';


describe('Router config', () => {
  beforeEach(() => {
    angular.module('test', [uiRouter])
      .config(routerConfig);

    angular.mock.module('test');
  });


  describe('`app.tasks` state', () => {
    describe('with `filter=active`', () => {
      it('should transition to `app.tasks` state', inject(($rootScope, $state) => {
        $state.go('app.tasks', {filter: 'active'});
        $rootScope.$digest();
        expect($state.current.name).toBe('app.tasks');
      }));

      it('should set param `filter` to `active`', inject(($rootScope, $state, $stateParams) => {
        $state.go('app.tasks', {filter: 'active'});
        $rootScope.$digest();
        expect($stateParams.filter).toBe('active');
      }));
    });

    describe('with `filter=completed`', () => {
      it('should transition to `app.tasks` state', inject(($rootScope, $state) => {
        $state.go('app.tasks', {filter: 'completed'});
        $rootScope.$digest();
        expect($state.current.name).toBe('app.tasks');
      }));

      it('should set param `filter` to `completed`', inject(($rootScope, $state, $stateParams) => {
        $state.go('app.tasks', {filter: 'completed'});
        $rootScope.$digest();
        expect($stateParams.filter).toBe('completed');
      }));
    });

    describe('with invalid `filter` param', () => {
      it('should transition to default `tasks` state', inject(($rootScope, $state) => {
        $state.go('app.tasks', {filter: 'foo'});
        $rootScope.$digest();
        expect($state.current.name).toBe('app.tasks');
      }));
    });
  });

});
