import {Injectable} from "@angular/core";
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageResponse} from "../../shared/models/page-response.model";
import {CustomerRequestDTO} from "../../shared/models/customer/customer-request.dto";
import {CustomerResponseDTO} from "../../shared/models/customer/customer-response.dto";
import {successContext} from '../../core/context/http-context';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly API = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {
  }

  create(dto: CustomerRequestDTO): Observable<CustomerResponseDTO> {
    return this.http.post<CustomerResponseDTO>(
      this.API,
      dto,
      {context: successContext('Cliente criado com sucesso!')}
    );
  }

  update(id: number, dto: CustomerRequestDTO): Observable<CustomerResponseDTO> {
    return this.http.put<CustomerResponseDTO>(
      `${this.API}/${id}`,
      dto,
      {context: successContext('Cliente atualizado com sucesso!')}
    );
  }

  findAll(
    page: number = 0,
    size: number = 10,
    sort?: string
  ): Observable<PageResponse<CustomerResponseDTO>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<PageResponse<CustomerResponseDTO>>(
      this.API,
      {params}
    );
  }

  findOne(id: number): Observable<CustomerResponseDTO> {
    return this.http.get<CustomerResponseDTO>(
      `${this.API}/${id}`
    );
  }

  disable(id: number): Observable<CustomerResponseDTO> {
    return this.http.patch<CustomerResponseDTO>(
      `${this.API}/${id}/disable`,
      {},
      {context: successContext('Cliente desativado com sucesso!')}
    );
  }
}
