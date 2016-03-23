import 'angular';
import { TaskItemComponent } from './task-item';


describe('TaskForm component', () => {
  let $controller;
  let model;
  let scope;


  beforeEach(() => {
    angular.module('test', [])
      .component('taskItem', TaskItemComponent);

    angular.mock.module('test');

    inject(($rootScope, _$componentController_) => {
      scope = $rootScope.$new();
      $controller = _$componentController_;
    });

    model = {completed: false, title: 'test'};
  });


  it('should set title with provided model binding', () => {
    let controller = $controller('taskItem', {$scope: scope}, {model});

    controller.edit();

    expect(controller.title).toBe(model.title);
  });

  it('should call deleteTask() binding', () => {
    let controller = $controller('taskItem', {$scope: scope}, {deleteTask: sinon.spy(), model});

    controller.delete();

    expect(controller.deleteTask.callCount).toBe(1);
    expect(controller.deleteTask.firstCall.args[0]).toEqual({task: model});
  });

  it('should call updateTask() binding', () => {
    let controller = $controller('taskItem', {$scope: scope}, {updateTask: sinon.spy(), model});

    controller.toggleCompleted();

    expect(controller.updateTask.callCount).toBe(1);
    expect(controller.updateTask.firstCall.args[0]).toEqual({task: {completed: true, title: 'test'}});
  });
});
