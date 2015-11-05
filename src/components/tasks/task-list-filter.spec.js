import 'angular';
import 'angular-mocks';
import { taskListFilter } from './task-list-filter';


describe('taskListFilter', () => {
  beforeEach(() => {
    angular.module('test', []).filter('filterTasks', taskListFilter);
    angular.mock.module('test');
  });


  it('should filter active tasks when param `filterType` is `active`', inject($filter => {
    let taskList = [{completed: true}, {completed: false}];
    let filter = $filter('filterTasks');
    let result = filter(taskList, 'active');

    expect(result.length).toBe(1);
    expect(result[0].completed).toBe(false);
  }));

  it('should filter completed tasks when param `filterType` is `completed`', inject($filter => {
    let taskList = [{completed: true}, {completed: false}];
    let filter = $filter('filterTasks');
    let result = filter(taskList, 'completed');

    expect(result.length).toBe(1);
    expect(result[0].completed).toBe(true);
  }));

  it('should return all tasks when param `filterType` is undefined', inject($filter => {
    let taskList = [{completed: true}, {completed: false}];
    let filter = $filter('filterTasks');
    let result = filter(taskList);

    expect(result).toBe(taskList);
  }));

  it('should return all tasks when param `filterType` is an empty string', inject($filter => {
    let taskList = [{completed: true}, {completed: false}];
    let filter = $filter('filterTasks');
    let result = filter(taskList, '');

    expect(result).toBe(taskList);
  }));
});
