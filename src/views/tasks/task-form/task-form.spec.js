import 'angular';
import { TaskFormComponent } from './task-form';


describe('TaskForm component', () => {
  let $controller;
  let scope;


  beforeEach(() => {
    angular.module('test', [])
      .component('taskForm', TaskFormComponent);

    angular.mock.module('test');

    inject(($rootScope, _$componentController_) => {
      scope = $rootScope.$new();
      $controller = _$componentController_;
    });
  });


  it('should define createTask binding', () => {
    let controller = $controller('taskForm', {$scope: scope}, {createTask: () => {}});
    expect(typeof controller.createTask).toBe('function');
  });

  it('should call createTask() when valid form is submitted', () => {
    let controller = $controller('taskForm', {$scope: scope}, {createTask: sinon.spy()});

    controller.title = 'Test';
    scope.newTaskForm = {$valid: true};
    scope.$digest();
    controller.submit();

    expect(controller.createTask.callCount).toBe(1);
    expect(controller.createTask.firstCall.args[0]).toEqual({title: 'Test'});
  });

  it('should NOT call createTask() when invalid form is submitted', () => {
    let controller = $controller('taskForm', {$scope: scope}, {createTask: sinon.spy()});

    scope.newTaskForm = {$valid: false};
    controller.submit();

    expect(controller.createTask.callCount).toBe(0);
  });
});
