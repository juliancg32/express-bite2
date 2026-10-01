/**
 * @license
 * Clean Architecture & SOLID Principles
 * Application Layer: Notification / Real-Time Dispatch Port
 * 
 * SOLID adherence:
 * - Interface Segregation Principle (ISP): Minimal interface for real-time order broadcast.
 */

import { OrderJSON } from '../../domain/entities/Order.ts';

export type RealTimeEventType = 
  | 'ORDER_CREATED'
  | 'ORDER_STATUS_CHANGED'
  | 'PRODUCT_STOCK_UPDATED'
  | 'ORDER_DELIVERED';

export interface RealTimePayload {
  type: RealTimeEventType;
  timestamp: string;
  order?: OrderJSON;
  productId?: string;
  newStock?: number;
  message: string;
}

export type RealTimeListener = (event: RealTimePayload) => void;

export interface INotificationService {
  publish(event: RealTimePayload): void;
  subscribe(listener: RealTimeListener): () => void; // Unsubscribe cleanup
}
