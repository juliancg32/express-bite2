/**
 * @license
 * Clean Architecture & SOLID Principles
 * Application Layer: Order Repository Port
 * 
 * SOLID adherence:
 * - Dependency Inversion Principle (DIP): Inverts dependency from domain/app onto storage.
 */

import { Order } from '../../domain/entities/Order.ts';
import { OrderStatusType } from '../../domain/value-objects/OrderStatus.ts';

export interface IOrderReader {
  findAll(): Promise<Order[]>;
  findActive(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  findByOrderNumber(orderNumber: string): Promise<Order | null>;
  findByStatus(status: OrderStatusType): Promise<Order[]>;
}

export interface IOrderWriter {
  save(order: Order): Promise<void>;
  update(order: Order): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface IOrderRepository extends IOrderReader, IOrderWriter {}
