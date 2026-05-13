import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() isOpen = true;

  menuItems = [
    {
      icon: 'speedometer2',
      label: 'Dashboard'
    },
    {
      icon: 'box-seam',
      label: 'Produtos'
    },
    {
      icon: 'people',
      label: 'Clientes'
    },
    {
      icon: 'cart',
      label: 'Vendas'
    },
    {
      icon: 'boxes',
      label: 'Estoque'
    }
  ];
}