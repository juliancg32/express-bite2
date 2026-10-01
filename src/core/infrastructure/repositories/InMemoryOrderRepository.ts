/**
 * @license
 * Infrastructure Layer: In-Memory Order Repository
 * 
 * SOLID adherence:
 * - Liskov Substitution Principle (LSP): Fully implements IOrderRepository.
 * - Dependency Inversion Principle (DIP): Pluggable database replacement without touching Use Cases.
 */

import { IOrderRepository } from '../../application/ports/IOrderRepository.ts';
import { Order } from '../../domain/entities/Order.ts';
import { OrderStatusType } from '../../domain/value-objects/OrderStatus.ts';
import { INITIAL_MOCK_ORDERS } from '../mocks/mockOrders.ts';

export class InMemoryOrderRepository implements IOrderRepository {
  private orders: Map<string, Order> = new Map();

  constructor(initialOrders: Order[] = INITIAL_MOCK_ORDERS) {
    initialOrders.forEach(o => this.orders.set(o.id, o));
  }

  public async findAll(): Promise<Order[]> {
    return Array.from(this.orders.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  public async findActive(): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(o => 
        o.status.value === OrderStatusType.PENDING ||
        o.status.value === OrderStatusType.PREPARING ||
        o.status.value === OrderStatusType.READY
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  public async findById(id: string): Promise<Order | null> {
    return this.orders.get(id) ?? null;
  }

  public async findByOrderNumber(orderNumber: string): Promise<Order | null> {
    const found = Array.from(this.orders.values()).find(
      o => o.orderNumber.toLowerCase() === orderNumber.toLowerCase()
    );
    return found ?? null;
  }

  public async findByStatus(status: OrderStatusType): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(o => o.status.value === status);
  }

  public async save(order: Order): Promise<void> {
    this.orders.set(order.id, order);
  }

  public async update(order: Order): Promise<void> {
    this.orders.set(order.id, order);
  }

  public async delete(id: string): Promise<void> {
    this.orders.delete(id);
  }
}
