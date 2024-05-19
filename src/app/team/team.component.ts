import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service';
import { MatList } from '@angular/material/list';
import { Observable } from 'rxjs';
import { Person } from '../interfaces/person';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    MatList,
    AsyncPipe,
    NgForOf,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit {
  persons$: Observable<Person[]> | undefined;

  constructor(
    private teamService: TeamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.persons$ = this.teamService.getAll();
  }

  delete(id: number): void {
    this.teamService.delete(id).subscribe(() => {
      this.persons$ = this.teamService.getAll();
    });
  }

  edit(id: number): void {
    this.router.navigate([`/team`, id]);
  }

  add(): void {
    this.router.navigate([`/team`, 'new']);
  }
}
