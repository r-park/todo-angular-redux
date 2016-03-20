/* eslint-disable no-undefined */
import 'angular';

import {
  CREATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  FETCH_TASKS_SUCCESS,
  UPDATE_TASK_SUCCESS
} from './constants';

import { INITIAL_STATE, taskReducer } from './reducer';


describe('Task reducer', () => {
  let task1;
  let task2;

  beforeEach(() => {
    task1 = {completed: false, id: 1, title: 'task 1'};
    task2 = {completed: false, id: 2, title: 'task 2'};
  });


  function getInitialState(state) {
    return angular.extend({}, INITIAL_STATE, state);
  }


  it('should return the initial state when action.type is not found', () => {
    expect(taskReducer(undefined, {})).toEqual(getInitialState());
  });


  describe('CREATE_TASK_SUCCESS', () => {
    it('should append new task to list', () => {
      let state = getInitialState({
        list: [ task1 ]
      });

      let nextState = taskReducer(state, {
        type: CREATE_TASK_SUCCESS,
        payload: task2
      });

      expect(nextState).toEqual({
        list: [ task1, task2 ]
      });
    });
  });


  describe('DELETE_TASK_SUCCESS', () => {
    it('should remove task from list', () => {
      let state = getInitialState({
        list: [ task1, task2 ]
      });

      let nextState = taskReducer(state, {
        type: DELETE_TASK_SUCCESS,
        meta: {
          id: task2.id
        }
      });

      expect(nextState).toEqual({
        list: [ task1 ]
      });
    });
  });


  describe('FETCH_TASKS_SUCCESS', () => {
    it('should set list with fetched tasks', () => {
      let state = getInitialState();

      let nextState = taskReducer(state, {
        type: FETCH_TASKS_SUCCESS,
        payload: [ task1, task2 ]
      });

      expect(nextState).toEqual({
        list: [ task1, task2 ]
      });
    });

    it('should set list with empty array if payload is undefined', () => {
      let state = getInitialState();

      let nextState = taskReducer(state, {
        type: FETCH_TASKS_SUCCESS,
        payload: undefined
      });

      expect(nextState).toEqual({
        list: []
      });
    });
  });


  describe('UPDATE_TASK_SUCCESS', () => {
    it('should update task', () => {
      let state = getInitialState({
        list: [ task1, task2 ]
      });

      let changedTask2 = angular.extend({}, task2, {title: 'changed'});

      let nextState = taskReducer(state, {
        type: UPDATE_TASK_SUCCESS,
        payload: changedTask2
      });

      expect(nextState).toEqual({
        list: [ task1, changedTask2 ]
      });
    });
  });
});
