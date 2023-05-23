import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { addTask, deleteTask, editTask, getTasks, addTaskArray } from '../store/action';
import { TaskItem } from './models';
import { selectTasks } from '../store/selector';
import { TaskState } from '../store/state';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from './Components/add-item-dialog/add-item-dialog.component';
import {filter, Observable} from "rxjs";
import {TasksFacade} from "../facades/tasks.facade";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks$: Observable<TaskItem[]> = new Observable<TaskItem[]>()
  length: number = 0;
  maxTasks = 4;

  constructor(private store: Store<TaskState>, public dialog: MatDialog, private tasksFacade: TasksFacade) {}

  ngOnInit() {

    this.tasks$ = this.tasksFacade.tasks$;
    this.tasksFacade.getTasks();

    this.tasks$.subscribe(tasks => this.length = tasks?.length);
  }

  deleteTask(task: TaskItem) {
    this.tasksFacade.deleteTask(task);
  }

  addTask(task: TaskItem) {
    this.tasksFacade.addTask(task);
  }

  editTask(task: TaskItem) {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      data: {
        isEdit:true,
        task
      }
    });
    dialogRef.afterClosed().pipe(filter(r => !!r)).subscribe(result => {
      console.log(result)
      this.tasksFacade.editTask({...result, completed: false})
    });
  }



  addTaskArrayDialog() {

    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      data: {
        isEdit:false,
      }
    });
    dialogRef.afterClosed().pipe(filter(r => !!r)).subscribe(result => {
        console.log(result)
        this.addTask({...result, completed: false} as TaskItem)
    });
  }
}
