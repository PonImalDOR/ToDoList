import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TaskItem} from '../app/models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'api/tasks';

  constructor(private http: HttpClient) {
  }

  getAllTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl);
  }

  addTask(task: TaskItem): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, task);
  }

  updateTask(task: TaskItem): Observable<TaskItem> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<TaskItem>(url, task);
  }

  deleteTask(task: TaskItem): Observable<TaskItem> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<TaskItem>(url);
  }

}
