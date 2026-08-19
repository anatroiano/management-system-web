import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {MovementType} from '../../shared/enums/movement-type.enum';

import {StockResponseDTO} from '../../shared/models/stock/stock-response.dto';
import {StockMovementResponseDTO} from '../../shared/models/stock/stock-movement-response.dto';

import {StockEntryRequestDTO} from '../../shared/models/stock/stock-entry-request.dto';
import {StockExitRequestDTO} from '../../shared/models/stock/stock-exit-request.dto';
import {environment} from '../../../enviroments/enviroment';
import {CreateStockRequestDTO} from '../../shared/models/stock/crete-stock-request.dto';
import {PageResponse} from '../../shared/models/page-response.model';
import {StockDashboardDTO} from '../../shared/models/stock/stock-dashboard.dto';
import {successContext} from '../context/http-context';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private readonly API = `${environment.apiUrl}/stocks`;


  constructor(
    private http: HttpClient
  ) {
  }

  create(request: CreateStockRequestDTO): Observable<StockResponseDTO> {
    return this.http.post<StockResponseDTO>(
      this.API,
      request,
      {context: successContext('Estoque criado com sucesso!')}
    );
  }

  findByProduct(productId: number): Observable<StockResponseDTO> {
    return this.http.get<StockResponseDTO>(
      `${this.API}/${productId}`
    );
  }

  getHistory(
    productId: number,
    page: number = 0,
    size: number = 20,
    type?: MovementType
  ): Observable<PageResponse<StockMovementResponseDTO>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (type) {
      params = params.set('type', type);
    }

    return this.http.get<PageResponse<StockMovementResponseDTO>>(
      `${this.API}/${productId}/history`,
      {params}
    );
  }

  addEntry(
    productId: number,
    request: StockEntryRequestDTO
  ): Observable<StockMovementResponseDTO> {

    return this.http.post<StockMovementResponseDTO>(
      `${this.API}/${productId}/entries`,
      request,
      {context: successContext('Entrada registrada com sucesso!')}
    );
  }

  addExit(
    productId: number,
    request: StockExitRequestDTO
  ): Observable<StockMovementResponseDTO> {

    return this.http.post<StockMovementResponseDTO>(
      `${this.API}/${productId}/exits`,
      request,
      {context: successContext('Saída registrada com sucesso!')}
    );
  }

  findAll(
    page: number = 0,
    size: number = 10,
    sort?: string
  ): Observable<PageResponse<StockResponseDTO>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<PageResponse<StockResponseDTO>>(
      this.API,
      {params}
    );
  }

  getDashboard(): Observable<StockDashboardDTO> {
    return this.http.get<StockDashboardDTO>(`${this.API}/dashboard`);
  }

}
