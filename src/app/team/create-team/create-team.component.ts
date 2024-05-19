import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PersonCreateData, PersonUpdateData } from '../../interfaces/person';

@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.scss',
})
export class CreateTeamComponent implements OnInit {
  teamForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
  });
  id: string | null = null;

  constructor(
    private teamService: TeamService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.teamService.get(Number(this.id)).subscribe(person => {
        this.teamForm.patchValue(person);
      });
    }
  }

  onSubmit(): void {
    if (this.teamForm.valid) {
      if (this.id) {
        this.teamService
          .update({
            ...this.teamForm.value,
            id: Number(this.id),
          } as PersonUpdateData)
          .subscribe(() => {
            this.router.navigate(['/team']);
          });
      } else {
        this.teamService
          .create(this.teamForm.value as PersonCreateData)
          .subscribe(() => {
            this.router.navigate(['/team']);
          });
      }
    }
  }
}
