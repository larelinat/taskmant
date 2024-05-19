import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../local-storage.service';
import { Status } from '../interfaces/status';
import { ITask, ITaskCreateData, ITaskUpdateData } from '../interfaces/task';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private url = 'http://localhost:3000/tasks';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getAll() {
    const tasks = this.localStorageService.getItemExp<ITask[]>('tasks');
    if (tasks) {
      return of(tasks);
    } else {
      return this.http.get<ITask[]>(this.url).pipe(
        tap(tasks => {
          this.localStorageService.setItemExp('tasks', tasks);
        })
      );
    }
  }

  get(id: number) {
    const task = this.localStorageService.getItemExp<ITask>(`task-${id}`);
    if (task) {
      return of(task);
    } else {
      return this.http.get<ITask>(`${this.url}/${id}`).pipe(
        tap(task => {
          this.localStorageService.setItemExp(`task-${id}`, task);
        })
      );
    }
  }

  create(task: ITaskCreateData) {
    return this.http.post<ITask>(this.url, task).pipe(
      tap(newTask => {
        this.localStorageService.setItemExp(`task-${newTask.id}`, newTask);
        this.localStorageService.removeItemExp('tasks');
      })
    );
  }

  update(task: ITaskUpdateData) {
    return this.http.patch(`${this.url}/${task.id}`, task).pipe(
      tap(() => {
        this.localStorageService.setItemExp(`task-${task.id}`, task);
        this.localStorageService.removeItemExp('tasks');
      })
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      tap(() => {
        this.localStorageService.removeItemExp(`task-${id}`);
        this.localStorageService.removeItemExp('tasks');
      })
    );
  }

  toggleStatus(id: number) {
    const task = this.get(id);
    return task.subscribe((task: ITask) => {
      const newStatus =
        task.status === Status.Done ? Status.InProgress : Status.Done;
      this.update({ id, status: newStatus });
    });
  }
}
