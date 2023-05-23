import { Injectable } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {TaskState} from "../store/state";
import {Observable} from "rxjs";
import {TaskItem} from "../app/models";
import {selectTasks} from "../store/selector";
import {editTask, getTasks, deleteTask, addTask } from 'src/store/action';

@Injectable({
  providedIn: 'root'
})
export class TasksFacade {

  public tasks$: Observable<TaskItem[]> = this.store.pipe(select(selectTasks));

  constructor(private store: Store<TaskState>) {
  }


  public getTasks(): void {
    this.store.dispatch(getTasks());
  }

  public editTask(task: TaskItem): void {
    this.store.dispatch(editTask({task}))
  }

  public addTask(task: TaskItem): void {
    this.store.dispatch(addTask({task}))
  }

  public deleteTask(task: TaskItem): void {
    this.store.dispatch(deleteTask({task}))
  }
}


