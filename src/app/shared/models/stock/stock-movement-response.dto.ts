import { MovementType } from "../../enums/movement-type.enum";

export interface StockMovementResponseDTO {
    id: number;
    productId: number;
    type: MovementType;
    quantity: number;
    reason: string;
    createdAt: string;
}