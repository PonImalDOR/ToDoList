import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup} from "@angular/forms";
import {TaskItem} from "../../models";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css']
})
export class AddItemDialogComponent implements OnInit {

  public formFields = [{title: 'Task name', formControl: 'name'}, {
    title: 'Task todo',
    formControl: 'todo'
  }, {title: 'Task difficulty', formControl: 'difficulty'}]
  public difficultyList = ['easy', 'medium', 'hard']
  inputText: string = '';

  public taskForm = new FormGroup({
    name: new FormControl(''),
    todo: new FormControl(''),
    difficulty: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean, task?: TaskItem }
  ) {
  }

  ngOnInit() {
    if (this.data.isEdit) {
      this.taskForm.patchValue({...this.data.task})
    }
    this.taskForm.valueChanges.subscribe(v => console.log(v))
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.taskForm.value);
  }
}
