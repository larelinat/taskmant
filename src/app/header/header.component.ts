import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../login/login.service';
import { NgIf, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, MatIconModule, MatButtonModule, NgIf, SlicePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(public loginService: LoginService) {}
}
