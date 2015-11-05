import 'angular';
import { createMockStore } from 'utils/create-mock-store';
import { API_BASE_URL, apiMiddleware } from 'modules/api';
import * as types from './constants';

import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask
} from './actions';


describe('Tasks actions', () => {
  let httpBackend;
  let middleware;
  let whenGET;
  let whenDELETE;
  let whenPOST;
  let whenPUT;

  beforeEach(() => {
    angular.mock.module($provide => {
      $provide.factory('apiMiddleware', apiMiddleware);
    });

    inject(($httpBackend, apiMiddleware) => {
      httpBackend = $httpBackend;
      middleware = apiMiddleware;
    });
  });


  afterEach(() => {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  describe('createTask', () => {
    beforeEach(() => {
      whenPOST = httpBackend.whenPOST(`${API_BASE_URL}/tasks`);
    });

    it('should create CREATE_TASK_SUCCESS', () => {
      const task = {completed: false, id: 1, title: 'create task'};

      const expectedActions = [
        {type: types.CREATE_TASK},
        {type: types.CREATE_TASK_SUCCESS, payload: task, meta: undefined}
      ];

      const store = createMockStore({list: []}, expectedActions, [middleware]);

      whenPOST.respond(200, task);
      store.dispatch(createTask('create task'));
      httpBackend.flush();
    });

    it('should create CREATE_TASK_ERROR', () => {
      const expectedActions = [
        {type: types.CREATE_TASK},
        {type: types.CREATE_TASK_ERROR, error: true, payload: {}, meta: undefined}
      ];

      const store = createMockStore({list: []}, expectedActions, [middleware]);

      whenPOST.respond(403, {});
      store.dispatch(createTask('create task'));
      httpBackend.flush();
    });
  });


  describe('deleteTask', () => {
    beforeEach(() => {
      whenDELETE = httpBackend.whenDELETE(`${API_BASE_URL}/tasks/1`);
    });

    it('should create DELETE_TASK_SUCCESS', () => {
      const expectedActions = [
        {type: types.DELETE_TASK},
        {type: types.DELETE_TASK_SUCCESS, payload: undefined, meta: {id: 1}}
      ];

      const store = createMockStore({list: []}, expectedActions, [middleware]);

      whenDELETE.respond(200);
      store.dispatch(deleteTask({id: 1}));
      httpBackend.flush();
    });

    it('should create DELETE_TASK_ERROR', () => {
      const expectedActions = [
        {type: types.DELETE_TASK},
        {type: types.DELETE_TASK_ERROR, error: true, payload: {}, meta: {id: 1}}
      ];

      const store = createMockStore({list: []}, expectedActions, [middleware]);

      whenDELETE.respond(403, {});
      store.dispatch(deleteTask({id: 1}));
      httpBackend.flush();
    });
  });


  describe('fetchTasks', () => {
    beforeEach(() => {
      whenGET = httpBackend.whenGET(`${API_BASE_URL}/tasks`);
    });

    it('should create FETCH_TASKS_SUCCESS', () => {
      const expectedActions = [
        {type: types.FETCH_TASKS},
        {type: types.FETCH_TASKS_SUCCESS, payload: [], meta: undefined}
      ];

      const store = createMockStore({list: []}, expectedActions, [middleware]);

      whenGET.respond(200, []);
      store.dispatch(fetchTasks());
      httpBackend.flush();
    });

    it('should create FETCH_TASKS_ERROR', () => {
      const expectedActions = [
        {type: types.FETCH_TASKS},
        {type: types.FETCH_TASKS_ERROR, error: true, payload: {}, meta: undefined}
      ];

      const store = createMockStore({list: []}, expectedActions, [middleware]);

      whenGET.respond(403, {});
      store.dispatch(fetchTasks());
      httpBackend.flush();
    });
  });


  describe('updateTask', () => {
    beforeEach(() => {
      whenPUT = httpBackend.whenPUT(`${API_BASE_URL}/tasks/1`);
    });

    it('should create UPDATE_TASK_SUCCESS', () => {
      const task = {completed: false, id: 1, title: 'update task'};

      const expectedActions = [
        {type: types.UPDATE_TASK},
        {type: types.UPDATE_TASK_SUCCESS, payload: task, meta: undefined}
      ];

      const store = createMockStore({list: []}, expectedActions, [middleware]);

      whenPUT.respond(200, task);
      store.dispatch(updateTask(task));
      httpBackend.flush();
    });

    it('should create UPDATE_TASK_ERROR', () => {
      const expectedActions = [
        {type: types.UPDATE_TASK},
        {type: types.UPDATE_TASK_ERROR, error: true, payload: {}, meta: undefined}
      ];

      const store = createMockStore({list: []}, expectedActions, [middleware]);

      whenPUT.respond(403, {});
      store.dispatch(updateTask({id: 1}));
      httpBackend.flush();
    });
  });
});
