/**
 * @license
 * Clean Architecture Use Case: CreateOrderUseCase
 * 
 * SOLID adherence:
 * - Single Responsibility Principle (SRP): Coordinates order creation, inventory decrement, and notification.
 * - Dependency Inversion Principle (DIP): Depends on IOrderRepository, IProductRepository, INotificationService.
 */

import { IOrderRepository } from '../ports/IOrderRepository.ts';
import { IProductRepository } from '../ports/IProductRepository.ts';
import { INotificationService } from '../ports/INotificationService.ts';
import { CreateOrderDTO } from '../dtos/index.ts';
import { Order, OrderItem } from '../../domain/entities/Order.ts';
import { OrderStatus } from '../../domain/value-objects/OrderStatus.ts';
import { ProductNotFoundError, EmptyOrderError } from '../../domain/errors/DomainError.ts';

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepo: IOrderRepository,
    private readonly productRepo: IProductRepository,
    private readonly notificationService: INotificationService
  ) {}

  public async execute(dto: CreateOrderDTO): Promise<Order> {
    if (!dto.items || dto.items.length === 0) {
      throw new EmptyOrderError();
    }

    const orderItems: OrderItem[] = [];

    // Check availability and decrement inventory
    for (const itemDto of dto.items) {
      const product = await this.productRepo.findById(itemDto.productId);
      if (!product) {
        throw new ProductNotFoundError(itemDto.productId);
      }

      // Domain invariant: throws InsufficientStockError if quantity > stock
      product.reduceStock(itemDto.quantity);
      await this.productRepo.save(product);

      orderItems.push(
        new OrderItem({
          productId: product.id,
          productName: product.name,
          unitPrice: product.price,
          quantity: itemDto.quantity,
          imageUrl: product.imageUrl,
          specialInstructions: itemDto.specialInstructions,
        })
      );
    }

    // Determine sequential order number
    const existingOrders = await this.orderRepo.findAll();
    const nextSeq = existingOrders.length + 41; // Start numbering around #041
    const orderNumber = `#${String(nextSeq).padStart(3, '0')}`;

    const order = new Order({
      id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      orderNumber,
      customerName: dto.customerName.trim() || 'Estudiante',
      items: orderItems,
      status: OrderStatus.PREPARING, // Starts in preparation
      createdAt: new Date(),
      pickupCounter: dto.pickupCounter ?? 'Mostrador 1',
      notes: dto.notes,
    });

    await this.orderRepo.save(order);

    // Notify listeners via event bus
    this.notificationService.publish({
      type: 'ORDER_CREATED',
      timestamp: new Date().toISOString(),
      order: order.toJSON(),
      message: `Nuevo pedido ${order.orderNumber} creado por ${order.customerName}`,
    });

    return order;
  }
}
