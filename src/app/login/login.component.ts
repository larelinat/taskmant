import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from './login.service';
import { Person } from '../interfaces/person';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup(
    {
      selectUser: new FormControl<number>(1, Validators.required),
    },
    { updateOn: 'submit' }
  );
  users: Person[] = [];
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.getAll().subscribe(data => {
      this.users = data;
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService
        .login(this.loginForm.value.selectUser as number)
        .subscribe();
    }
  }
}
