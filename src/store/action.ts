import { createAction, props } from '@ngrx/store';
import { TaskItem } from '../app/models';

export const getTasks = createAction('[Task] Get Tasks');

export const getTasksSuccess = createAction(
  '[Task] Get Tasks Success',
  props<{ tasks: TaskItem[] }>()
);

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: TaskItem }>()
);

export const editTask = createAction(
  '[Task] Edit Task',
  props<{ task: TaskItem }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ task: TaskItem }>()
);

export const addTaskArray = createAction(
  '[Task] Add Task Array',
  props<{ myArray: any[] }>()
);

export const anotherAction = createAction(
  '[Task] Another Action',
  props<{ payload: any }>()
);
