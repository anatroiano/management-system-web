import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {NavbarConfig, NavbarService} from '../../../core/services/navbar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navbarConfig!: NavbarConfig;

  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(
    private navbarService: NavbarService
  ) {
  }

  ngOnInit(): void {
    this.navbarService.navbarConfig$
      .subscribe(config => {
        this.navbarConfig = config;
      });
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}
