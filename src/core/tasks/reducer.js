import { createReducer } from 'src/utils';

import {
  CREATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  FETCH_TASKS_SUCCESS,
  UPDATE_TASK_SUCCESS
} from './action-types';


export const INITIAL_STATE = {
  list: []
};


export const taskReducer = createReducer(INITIAL_STATE, {
  [CREATE_TASK_SUCCESS](state, action) {
    return {
      list: [ ...state.list, action.payload ]
    };
  },

  [DELETE_TASK_SUCCESS](state, action) {
    const { id } = action.meta;
    return {
      list: state.list.filter(task => {
        return task.id !== id;
      })
    };
  },

  [FETCH_TASKS_SUCCESS](state, action) {
    return {
      list: action.payload || []
    };
  },

  [UPDATE_TASK_SUCCESS](state, action) {
    const { id } = action.payload;
    return {
      list: state.list.map(task => {
        return task.id === id ? action.payload : task;
      })
    };
  }
});
