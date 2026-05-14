import {Component, OnInit} from '@angular/core';
import {DataTableComponent} from '../../shared/components/data-table/data-table.component';
import {NavbarService} from '../../core/services/navbar.service';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  imports: [
    DataTableComponent
  ]
})
export class ProductComponent implements OnInit {

  columns = [
    {field: 'id', label: 'ID'},
    {field: 'code', label: 'Código'},
    {field: 'name', label: 'Nome'}
  ];

  products = [
    {
      id: 1,
      code: 'PRD-001',
      name: 'Notebook Dell'
    },
    {
      id: 2,
      code: 'PRD-002',
      name: 'Mouse Gamer'
    },
    {
      id: 3,
      code: 'PRD-003',
      name: 'Teclado Mecânico'
    }
  ];

  constructor(
    private navbarService: NavbarService
  ) {
  }

  ngOnInit(): void {
    this.navbarService.setConfig(
      {
        icon: "box-seam",
        showFilter: false,
        title: "Produtos"
      }
    );
  }

  onCreate(): void {
    console.log('Novo produto');
  }

  onEdit(product: any): void {
    console.log('Editar', product);
  }

  onDelete(product: any): void {
    console.log('Excluir', product);
  }

  onView(product: any): void {
    console.log('Visualizar', product);
  }
}
