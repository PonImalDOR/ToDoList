import { createReducer, on } from '@ngrx/store';
import { TaskItem } from '../app/models';
import { addTask, addTaskArray, deleteTask, editTask, getTasksSuccess } from './action';

export interface TaskState {
  taskArray: TaskItem[];
  myArray: string[];
}

export const initialTaskState: TaskState = {
  taskArray: [],
  myArray: [],
};

export const taskReducer = createReducer(
  initialTaskState,
  on(getTasksSuccess, (state, { tasks }) => ({
    ...state,
    taskArray: tasks,
  })),
  on(addTask, (state, { task }) => ({
    ...state,
    taskArray: [task, ...state.taskArray],
  })),
  on(editTask, (state, { task }) => ({
    ...state,
    taskArray: state.taskArray.map((t) => (t.name === task.name ? task : t)),
  })),
  on(deleteTask, (state, { task }) => ({
    ...state,
    taskArray: state.taskArray.filter((t) => t.name !== task.name),
  })),
  on(addTaskArray, (state, { myArray }) => ({
    ...state,
    myArray: [...myArray, ...state.myArray],
    taskArray: [...myArray, ...state.taskArray],
  })),
);
