import {SaleStatus} from "../../enums/sale-status.enum";
import {SaleItemResponseDTO} from "./sale-item-response.dto";

export interface SaleResponseDTO {
  id: number;
  customerId: number;
  status: SaleStatus;
  totalAmount: number;
  items: SaleItemResponseDTO[];
  createdAt: string;
}
