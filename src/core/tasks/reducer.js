import {
  CREATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  FETCH_TASKS_SUCCESS,
  UPDATE_TASK_SUCCESS
} from './action-types';


export const INITIAL_STATE = {
  isLoaded: false,
  list: []
};


export function taskReducer(state = INITIAL_STATE, {meta, payload, type}) {
  switch (type) {
    case CREATE_TASK_SUCCESS:
      return Object.assign({}, state, {
        list: [ ...state.list, payload ]
      });

    case DELETE_TASK_SUCCESS:
      return Object.assign({}, state, {
        list: state.list.filter(task => {
          return task.id !== meta.id;
        })
      });

    case FETCH_TASKS_SUCCESS:
      return {
        isLoaded: true,
        list: payload || []
      };

    case UPDATE_TASK_SUCCESS:
      return Object.assign({}, state, {
        list: state.list.map(task => {
          return task.id === payload.id ? payload : task;
        })
      });

    default:
      return state;
  }
}
