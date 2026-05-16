import { Injectable } from "@angular/core";
import { environment } from "../../../enviroments/enviroment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ProductResponseDTO } from "../../shared/models/product-response.dto";
import { Observable } from "rxjs";
import { ProductRequestDTO } from "../../shared/models/product-request.dto";
import { PageResponse } from "../../shared/models/page-response.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

   create(dto: ProductRequestDTO): Observable<ProductResponseDTO> {
    return this.http.post<ProductResponseDTO>(
      this.API,
      dto
    );
  }

  update(id: number, dto: ProductRequestDTO): Observable<ProductResponseDTO> {
    return this.http.put<ProductResponseDTO>(
      `${this.API}/${id}`,
      dto
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
      { params }
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
      {}
    );
  }
}