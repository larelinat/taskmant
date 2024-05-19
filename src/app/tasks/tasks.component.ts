import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TasksService } from './tasks.service';
import { Router } from '@angular/router';
import { ITask } from '../interfaces/task';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    AsyncPipe,
    NgForOf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  tasks$: Observable<ITask[]> | undefined;

  constructor(
    private tasksService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.tasksService.getAll();
  }

  delete(id: number): void {
    this.tasksService.delete(id).subscribe();
  }

  edit(id: number): void {
    this.router.navigate([`/tasks`, id]);
  }

  add(): void {
    this.router.navigate([`/tasks`, 'new']);
  }
}
