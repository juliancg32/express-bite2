/**
 * @license
 * Clean Architecture Use Case: UpdateOrderStatusUseCase
 * 
 * SOLID adherence:
 * - Single Responsibility Principle (SRP): Coordinates order status lifecycle progression.
 * - Open/Closed Principle (OCP): Logic adheres to OrderStatus domain rules without modification.
 */

import { IOrderRepository } from '../ports/IOrderRepository.ts';
import { INotificationService } from '../ports/INotificationService.ts';
import { OrderStatus, OrderStatusType } from '../../domain/value-objects/OrderStatus.ts';
import { OrderNotFoundError } from '../../domain/errors/DomainError.ts';
import { Order } from '../../domain/entities/Order.ts';

export class UpdateOrderStatusUseCase {
  constructor(
    private readonly orderRepo: IOrderRepository,
    private readonly notificationService: INotificationService
  ) {}

  public async execute(orderId: string, newStatusType: OrderStatusType): Promise<Order> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) {
      throw new OrderNotFoundError(orderId);
    }

    const targetStatus = OrderStatus.fromString(newStatusType);

    if (targetStatus.value === OrderStatusType.DELIVERED) {
      order.markAsDelivered();
    } else if (targetStatus.value === OrderStatusType.READY) {
      order.markAsReady();
    } else {
      order.transitionTo(targetStatus);
    }

    await this.orderRepo.update(order);

    this.notificationService.publish({
      type: targetStatus.value === OrderStatusType.DELIVERED ? 'ORDER_DELIVERED' : 'ORDER_STATUS_CHANGED',
      timestamp: new Date().toISOString(),
      order: order.toJSON(),
      message: `Pedido ${order.orderNumber} pasó a estado: ${targetStatus.getMetadata().label}`,
    });

    return order;
  }
}
