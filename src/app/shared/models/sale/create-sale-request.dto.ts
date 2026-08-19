import {CreateSaleItemRequestDTO} from "./create-sale-item-request.dto";

export interface CreateSaleRequestDTO {
  customerId: number;
  items: CreateSaleItemRequestDTO[];
}
