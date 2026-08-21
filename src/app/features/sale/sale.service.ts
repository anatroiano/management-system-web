import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageResponse} from "../../shared/models/page-response.model";
import {SaleResponseDTO} from "../../shared/models/sale/sale-response.dto";
import {CreateSaleRequestDTO} from "../../shared/models/sale/create-sale-request.dto";
import {SaleDashboardDTO} from "../../shared/models/sale/sale-dashboard.dto";
import {successContext} from '../../core/context/http-context';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private readonly API = `${environment.apiUrl}/sales`;

  constructor(private http: HttpClient) {
  }

  create(dto: CreateSaleRequestDTO): Observable<SaleResponseDTO> {
    return this.http.post<SaleResponseDTO>(
      this.API,
      dto,
      {context: successContext('Venda criada com sucesso!')}
    );
  }

  findAll(
    page: number = 0,
    size: number = 10,
    sort?: string
  ): Observable<PageResponse<SaleResponseDTO>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<PageResponse<SaleResponseDTO>>(
      this.API,
      {params}
    );
  }

  findOne(id: number): Observable<SaleResponseDTO> {
    return this.http.get<SaleResponseDTO>(
      `${this.API}/${id}`
    );
  }

  cancel(id: number): Observable<SaleResponseDTO> {
    return this.http.patch<SaleResponseDTO>(
      `${this.API}/${id}/cancel`,
      {},
      {context: successContext('Venda cancelada com sucesso!')}
    );
  }

  getDashboard(): Observable<SaleDashboardDTO> {
    return this.http.get<SaleDashboardDTO>(`${this.API}/dashboard`);
  }
}
