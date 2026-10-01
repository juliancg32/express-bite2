/**
 * @license
 * Clean Architecture Use Case: GetProductsUseCase
 * 
 * SOLID adherence:
 * - Single Responsibility Principle (SRP): Only responsible for querying the product catalog.
 * - Dependency Inversion Principle (DIP): Injected with IProductReader port.
 */

import { IProductReader } from '../ports/IProductRepository.ts';
import { Product, ProductCategory } from '../../domain/entities/Product.ts';
import { FilterProductsDTO } from '../dtos/index.ts';

export class GetProductsUseCase {
  constructor(private readonly productReader: IProductReader) {}

  public async execute(filter?: FilterProductsDTO): Promise<Product[]> {
    let products: Product[];

    if (filter?.category && filter.category !== 'todo') {
      products = await this.productReader.findByCategory(filter.category);
    } else {
      products = await this.productReader.findAll();
    }

    if (filter?.onlyAvailable) {
      products = products.filter(p => p.isAvailable());
    }

    if (filter?.searchQuery && filter.searchQuery.trim() !== '') {
      const q = filter.searchQuery.toLowerCase().trim();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.station.toLowerCase().includes(q)
      );
    }

    return products;
  }
}
