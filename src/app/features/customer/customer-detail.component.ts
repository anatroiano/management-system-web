import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CurrencyUtil } from "../../shared/utils/current.util";
import { CommonModule } from "@angular/common";
import { CustomerNavigationService } from "./customer-navigation.service";
import { NavbarService } from "../../core/services/navbar.service";
import { CustomerService } from "../../core/services/customer.service";
import { CustomerResponseDTO } from "../../shared/models/customer/customer-response.dto";
import { formatDocument, formatPhone } from "../../shared/utils/format.util";

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent implements OnInit {

  customer!: CustomerResponseDTO;

  protected readonly CurrencyUtil = CurrencyUtil;
  protected readonly formatPhone = formatPhone;
  protected readonly formatDocument = formatDocument;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private navigation: CustomerNavigationService,
    private navbarService: NavbarService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.customerService.findOne(Number(id))
        .subscribe({
          next: (response) => {
            this.customer = response;

            this.navbarService.setConfig({
              icon: 'people',
              showFilter: false,
              title: 'Visualizar cliente'
            });

          },
          error: (err) => {
            console.error('Erro ao buscar cliente', err);
          }
        });
    }

  }

  goToList(): void {
    this.navigation.goToList();
  }

  goToEdit(): void {
    this.navigation.goToEdit(this.customer.id);
  }

}