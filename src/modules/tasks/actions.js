import {
  API_BASE_URL,
  API_REQUEST
} from 'modules/api/constants';

import {
  CREATE_TASK_TYPES,
  DELETE_TASK_TYPES,
  FETCH_TASKS_TYPES,
  UPDATE_TASK_TYPES
} from './constants';


export function createTask(title) {
  return {
    [API_REQUEST]: {
      types: CREATE_TASK_TYPES,
      config: {
        data: {completed: false, title},
        method: 'post',
        url: `${API_BASE_URL}/tasks`
      }
    }
  };
}

export function deleteTask(task) {
  return {
    [API_REQUEST]: {
      types: DELETE_TASK_TYPES,
      config: {
        method: 'delete',
        url: `${API_BASE_URL}/tasks/${task.id}`
      }
    },
    meta: {
      id: task.id
    }
  };
}

export function fetchTasks() {
  return {
    [API_REQUEST]: {
      types: FETCH_TASKS_TYPES,
      config: {
        method: 'get',
        url: `${API_BASE_URL}/tasks`
      }
    }
  };
}

export function updateTask(task) {
  return {
    [API_REQUEST]: {
      types: UPDATE_TASK_TYPES,
      config: {
        data: task,
        method: 'put',
        url: `${API_BASE_URL}/tasks/${task.id}`
      }
    }
  };
}
