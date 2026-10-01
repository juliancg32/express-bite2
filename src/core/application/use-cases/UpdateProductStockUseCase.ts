/**
 * @license
 * Clean Architecture Use Case: UpdateProductStockUseCase
 * 
 * SOLID adherence:
 * - Single Responsibility Principle (SRP): Handles real-time inventory adjustments.
 * - Dependency Inversion Principle (DIP): Injected with IProductRepository and INotificationService.
 */

import { IProductRepository } from '../ports/IProductRepository.ts';
import { INotificationService } from '../ports/INotificationService.ts';
import { ProductNotFoundError } from '../../domain/errors/DomainError.ts';
import { Product } from '../../domain/entities/Product.ts';

export class UpdateProductStockUseCase {
  constructor(
    private readonly productRepo: IProductRepository,
    private readonly notificationService: INotificationService
  ) {}

  public async execute(productId: string, newStock: number): Promise<Product> {
    const product = await this.productRepo.findById(productId);
    if (!product) {
      throw new ProductNotFoundError(productId);
    }

    product.updateStock(newStock);
    await this.productRepo.save(product);

    this.notificationService.publish({
      type: 'PRODUCT_STOCK_UPDATED',
      timestamp: new Date().toISOString(),
      productId: product.id,
      newStock,
      message: `Stock de "${product.name}" actualizado a ${newStock} unidades`,
    });

    return product;
  }
}
