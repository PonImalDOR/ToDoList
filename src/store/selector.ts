import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './state';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.taskArray
);

export const selectTaskArray = createSelector(
  selectTaskState,
  (state: TaskState) => state.taskArray
);

export const selectCompletedTasks = createSelector(
  selectTasks,
  (tasks) => tasks.filter((task) => task.completed)
);

export const selectIncompleteTasks = createSelector(
  selectTasks,
  (tasks) => tasks.filter((task) => !task.completed)
);
