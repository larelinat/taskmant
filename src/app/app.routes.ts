import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TeamComponent } from './team/team.component';
import { CreateTeamComponent } from './team/create-team/create-team.component';

export const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
  },
  {
    path: 'team/new',
    component: CreateTeamComponent,
  },
  {
    path: 'team/:id',
    component: CreateTeamComponent,
  },
  {
    path: 'team',
    component: TeamComponent,
  },

  {
    path: '**',
    redirectTo: '/tasks',
  },
];
