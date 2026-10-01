/**
 * @license
 * Clean Architecture & SOLID Principles
 * Application Layer: Repository Ports (Interfaces)
 * 
 * SOLID adherence:
 * - Dependency Inversion Principle (DIP): The Application layer depends only on this interface,
 *   never on the concrete database or in-memory implementation.
 * - Interface Segregation Principle (ISP): Granular read & write contracts can be composed.
 */

import { Product, ProductCategory } from '../../domain/entities/Product.ts';

export interface IProductReader {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findByCategory(category: ProductCategory): Promise<Product[]>;
}

export interface IProductWriter {
  save(product: Product): Promise<void>;
  updateStock(id: string, newStock: number): Promise<Product>;
  bulkSave(products: Product[]): Promise<void>;
}

export interface IProductRepository extends IProductReader, IProductWriter {}
