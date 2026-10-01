/**
 * @license
 * Clean Architecture Application DTOs (Data Transfer Objects)
 */

import { ProductCategory } from '../../domain/entities/Product.ts';
import { OrderStatusType } from '../../domain/value-objects/OrderStatus.ts';

export interface CreateOrderItemDTO {
  productId: string;
  quantity: number;
  specialInstructions?: string;
}

export interface CreateOrderDTO {
  customerName: string;
  items: CreateOrderItemDTO[];
  pickupCounter?: string;
  notes?: string;
}

export interface UpdateOrderStatusDTO {
  orderId: string;
  newStatus: OrderStatusType;
}

export interface UpdateProductStockDTO {
  productId: string;
  newStock: number;
}

export interface FilterProductsDTO {
  category?: ProductCategory;
  onlyAvailable?: boolean;
  searchQuery?: string;
}
