import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProductResponseDTO} from "../../shared/models/product/product-response.dto";
import {Observable} from "rxjs";
import {ProductRequestDTO} from "../../shared/models/product/product-request.dto";
import {PageResponse} from "../../shared/models/page-response.model";
import {successContext} from '../../core/context/http-context';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {
  }

  create(dto: ProductRequestDTO): Observable<ProductResponseDTO> {
    return this.http.post<ProductResponseDTO>(
      this.API,
      dto,
      {context: successContext('Produto criado com sucesso!')}
    );
  }

  update(id: number, dto: ProductRequestDTO): Observable<ProductResponseDTO> {
    return this.http.put<ProductResponseDTO>(
      `${this.API}/${id}`,
      dto,
      {context: successContext('Produto atualizado com sucesso!')}
    );
  }

  findAll(
    page: number = 0,
    size: number = 10,
    sort?: string
  ): Observable<PageResponse<ProductResponseDTO>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<PageResponse<ProductResponseDTO>>(
      this.API,
      {params}
    );
  }

  findOne(id: number): Observable<ProductResponseDTO> {
    return this.http.get<ProductResponseDTO>(
      `${this.API}/${id}`
    );
  }

  disable(id: number): Observable<ProductResponseDTO> {
    return this.http.patch<ProductResponseDTO>(
      `${this.API}/${id}/disable`,
      {},
      {context: successContext('Produto desativado com sucesso!')}
    );
  }
}
