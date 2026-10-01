/**
 * @license
 * Presentation Layer: useProducts Hook
 * Consumes GetProductsUseCase and UpdateProductStockUseCase through DI.
 */

import { useState, useEffect, useCallback } from 'react';
import { appContainer } from '../../core/di/container.ts';
import { Product, ProductCategory, ProductJSON } from '../../core/domain/entities/Product.ts';

export function useProducts() {
  const [products, setProducts] = useState<ProductJSON[]>([]);
  const [category, setCategory] = useState<ProductCategory>('todo');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const domainProducts = await appContainer.getProductsUseCase.execute({
        category,
        searchQuery,
      });
      setProducts(domainProducts.map((p: Product) => p.toJSON()));
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }, [category, searchQuery]);

  useEffect(() => {
    fetchProducts();

    // Subscribe to stock and order real-time events to update inventory reactively
    const unsubscribe = appContainer.notificationService.subscribe((event) => {
      if (
        event.type === 'PRODUCT_STOCK_UPDATED' ||
        event.type === 'ORDER_CREATED'
      ) {
        fetchProducts();
      }
    });

    return () => unsubscribe();
  }, [fetchProducts]);

  const updateProductStock = async (productId: string, newStock: number): Promise<void> => {
    try {
      await appContainer.updateProductStockUseCase.execute(productId, newStock);
      await fetchProducts();
    } catch (err: unknown) {
      throw err;
    }
  };

  return {
    products,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    loading,
    error,
    refreshProducts: fetchProducts,
    updateProductStock,
  };
}
