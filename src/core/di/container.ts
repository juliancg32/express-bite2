/**
 * @license
 * Clean Architecture & SOLID Principles
 * Dependency Injection (DI) Container / Service Locator
 * 
 * SOLID adherence:
 * - Dependency Inversion Principle (DIP): Injects abstractions into high-level use cases.
 * - Single Responsibility Principle (SRP): Isolates the composition root of the application.
 */

import { InMemoryProductRepository } from '../infrastructure/repositories/InMemoryProductRepository.ts';
import { InMemoryOrderRepository } from '../infrastructure/repositories/InMemoryOrderRepository.ts';
import { EventBusNotificationService } from '../infrastructure/services/EventBusNotificationService.ts';

import { IProductRepository } from '../application/ports/IProductRepository.ts';
import { IOrderRepository } from '../application/ports/IOrderRepository.ts';
import { INotificationService } from '../application/ports/INotificationService.ts';

import { GetProductsUseCase } from '../application/use-cases/GetProductsUseCase.ts';
import { CreateOrderUseCase } from '../application/use-cases/CreateOrderUseCase.ts';
import { UpdateOrderStatusUseCase } from '../application/use-cases/UpdateOrderStatusUseCase.ts';
import { UpdateProductStockUseCase } from '../application/use-cases/UpdateProductStockUseCase.ts';
import { GetOrdersUseCase } from '../application/use-cases/GetOrdersUseCase.ts';

class DIContainer {
  // Repositories & Services (Singletons in client runtime)
  private readonly _productRepository: IProductRepository;
  private readonly _orderRepository: IOrderRepository;
  private readonly _notificationService: INotificationService;

  // Use Cases
  public readonly getProductsUseCase: GetProductsUseCase;
  public readonly createOrderUseCase: CreateOrderUseCase;
  public readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase;
  public readonly updateProductStockUseCase: UpdateProductStockUseCase;
  public readonly getOrdersUseCase: GetOrdersUseCase;

  constructor() {
    // 1. Instantiate Infrastructure Adapters
    this._productRepository = new InMemoryProductRepository();
    this._orderRepository = new InMemoryOrderRepository();
    this._notificationService = new EventBusNotificationService();

    // 2. Wire Application Use Cases via Dependency Injection
    this.getProductsUseCase = new GetProductsUseCase(this._productRepository);
    
    this.createOrderUseCase = new CreateOrderUseCase(
      this._orderRepository,
      this._productRepository,
      this._notificationService
    );

    this.updateOrderStatusUseCase = new UpdateOrderStatusUseCase(
      this._orderRepository,
      this._notificationService
    );

    this.updateProductStockUseCase = new UpdateProductStockUseCase(
      this._productRepository,
      this._notificationService
    );

    this.getOrdersUseCase = new GetOrdersUseCase(this._orderRepository);
  }

  public get productRepository(): IProductRepository {
    return this._productRepository;
  }

  public get orderRepository(): IOrderRepository {
    return this._orderRepository;
  }

  public get notificationService(): INotificationService {
    return this._notificationService;
  }
}

// Export singleton instance representing the Composition Root
export const appContainer = new DIContainer();
