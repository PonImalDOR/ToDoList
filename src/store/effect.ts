import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { TaskItem } from '../app/models';
import { addTask, deleteTask, editTask, getTasks, getTasksSuccess, anotherAction } from './action';
import { Store } from '@ngrx/store';

@Injectable()
export class TaskEffects {
  private randomTodo = ['дописати таск менеджер', 'сходити в магазин', 'прогулятись'];

  constructor(private actions$: Actions, private store: Store) {}

  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTasks),
      map(() => {
        const tasks: TaskItem[] = this.createMockTasks();
        return getTasksSuccess({ tasks });
      })
    )
  );

  private createMockTasks(): TaskItem[] {
    const tasks: TaskItem[] = [];

    for (let i = 0; i < 6; i++) {
      const task = {
        name: `Task ${i + 1}`,
        todo: this.randomTodo[Math.floor(Math.random() * this.randomTodo.length)],
        createdAt: new Date(new Date(2022, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2022, 0, 1).getTime())),
      } as TaskItem;

      tasks.push(task);
    }

    return tasks;
  }

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      map(action => action.task),
      tap(task => {
        console.log('add task', task);
        this.store.dispatch(anotherAction({ payload: task }));
      })
    ), { dispatch: false }
  );

  editTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editTask),
        map((action) => {
          console.log(action.task)
        })
      ), {dispatch: false}
  );

  deleteTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteTask),
        map((action) => {
          console.log(action.task)
        })
      ), {dispatch: false}
  );
}
