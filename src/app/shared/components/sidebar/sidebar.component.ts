import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {TokenService} from '../../../core/services/token.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() isOpen = true;

  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {
  }

  menuItems = [
    {
      icon: 'speedometer2',
      label: 'Dashboard',
      link: '/dashboard'
    },
    {
      icon: 'box-seam',
      label: 'Produtos',
      link: '/products'
    },
    {
      icon: 'people',
      label: 'Clientes',
      link: '/customers'
    },
    {
      icon: 'boxes',
      label: 'Estoque',
      link: '/stocks'
    },
    {
      icon: 'cart',
      label: 'Vendas',
      link: '/sales'
    }
  ];

  toggle(): void {
    this.toggleSidebar.emit();
  }

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }
}
