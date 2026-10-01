/**
 * @license
 * Infrastructure Layer: In-Memory Product Repository
 * 
 * SOLID adherence:
 * - Liskov Substitution Principle (LSP): Fully implements IProductRepository contract.
 * - Dependency Inversion Principle (DIP): Low-level persistence module conforming to application port.
 */

import { IProductRepository } from '../../application/ports/IProductRepository.ts';
import { Product, ProductCategory } from '../../domain/entities/Product.ts';
import { INITIAL_MOCK_PRODUCTS } from '../mocks/mockProducts.ts';
import { ProductNotFoundError } from '../../domain/errors/DomainError.ts';

export class InMemoryProductRepository implements IProductRepository {
  private products: Map<string, Product> = new Map();

  constructor(initialProducts: Product[] = INITIAL_MOCK_PRODUCTS) {
    initialProducts.forEach(p => this.products.set(p.id, p));
  }

  public async findAll(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  public async findById(id: string): Promise<Product | null> {
    const product = this.products.get(id);
    return product ?? null;
  }

  public async findByCategory(category: ProductCategory): Promise<Product[]> {
    if (category === 'todo') {
      return this.findAll();
    }
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  public async save(product: Product): Promise<void> {
    this.products.set(product.id, product);
  }

  public async updateStock(id: string, newStock: number): Promise<Product> {
    const product = this.products.get(id);
    if (!product) {
      throw new ProductNotFoundError(id);
    }
    product.updateStock(newStock);
    this.products.set(id, product);
    return product;
  }

  public async bulkSave(products: Product[]): Promise<void> {
    products.forEach(p => this.products.set(p.id, p));
  }
}
