import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() isOpen = true;

  menuItems = [
    {
      icon: 'speedometer2',
      label: 'Dashboard',
      link: ''
    },
    {
      icon: 'box-seam',
      label: 'Produtos',
      link: '/products'
    },
    {
      icon: 'people',
      label: 'Clientes',
      link: ''
    },
    {
      icon: 'cart',
      label: 'Vendas',
      link: ''
    },
    {
      icon: 'boxes',
      label: 'Estoque',
      link: ''
    }
  ];
}
