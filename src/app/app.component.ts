import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { LoginService } from './login/login.service';
import { NgIf } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbar,
    NgIf,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MatTabsModule,
    MatButtonModule,
    MatToolbar,
    RouterLink,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'taskmant';
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  constructor(public loginService: LoginService) {}
}
