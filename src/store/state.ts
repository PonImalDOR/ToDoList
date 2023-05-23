import { TaskItem } from '../app/models';
import { createFeatureSelector } from '@ngrx/store';
export interface AppState {
  tasks: TaskItem[];
}

export const TaskState = createFeatureSelector<AppState>('tasks');

export interface TaskState {
  tasks: TaskItem[];
}

export interface TaskState {
  taskArray: TaskItem[];
}
