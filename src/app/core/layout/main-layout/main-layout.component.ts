import {Component} from '@angular/core';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';
import {NavbarComponent} from '../../../shared/components/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
