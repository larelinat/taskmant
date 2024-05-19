import { Component, OnInit } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatToolbar,
    RouterLink,
    MatIconModule,
    RouterLinkActive,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  links: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.links = [
      {
        index: 0,
        label: 'Задачи',
        path: '/tasks',
        icon: 'list',
      },
      {
        index: 1,
        label: 'Команда',
        path: '/team',
        icon: 'groups',
      },
    ];
  }

  ngOnInit() {
    this.router.events.subscribe(res => {
      this.activeLinkIndex = this.links.indexOf(
        this.links.find(tab => tab.path === '.' + this.router.url)
      );
    });
  }
}
