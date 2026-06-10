import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductResponseDTO } from "../../shared/models/product/product-response.dto";
import { CurrencyUtil } from "../../shared/utils/current.util";
import { ProductService } from "../../core/services/product.service";
import { CommonModule } from "@angular/common";
import { ProductNavigationService } from "./product-navigation.service";
import { NavbarService } from "../../core/services/navbar.service";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {

  product!: ProductResponseDTO;

  protected readonly CurrencyUtil = CurrencyUtil;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private navigation: ProductNavigationService,
    private navbarService: NavbarService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.findOne(Number(id))
        .subscribe({
          next: (response) => {
            this.product = response;

            this.navbarService.setConfig({
              icon: 'box-seam',
              showFilter: false,
              title: 'Produtos'
            });

          },
          error: (err) => {
            console.error('Erro ao buscar produto', err);
          }
        });
    }

  }

  goToList(): void {
    this.navigation.goToList();
  }

  goToEdit(): void {
    this.navigation.goToEdit(this.product.id);
  }

}