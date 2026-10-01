/**
 * @license
 * Presentation Layer: useCart Hook
 * Cart state management with validation against Product domain entities.
 */

import { useState } from 'react';
import { ProductJSON } from '../../core/domain/entities/Product.ts';
import { CreateOrderDTO } from '../../core/application/dtos/index.ts';

export interface CartItem {
  product: ProductJSON;
  quantity: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState<string>('Camila Valenzuela');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const addItem = (product: ProductJSON, quantity: number = 1) => {
    if (!product.isAvailable) return;

    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        const nextQty = existing.quantity + quantity;
        if (nextQty > product.stock) return prev; // Cannot exceed stock
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: nextQty } : i);
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev => prev.map(i => {
      if (i.product.id === productId) {
        return { ...i, quantity: Math.min(qty, i.product.stock) };
      }
      return i;
    }));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const buildCreateOrderDTO = (): CreateOrderDTO => {
    return {
      customerName: customerName.trim() || 'Estudiante',
      items: items.map(i => ({
        productId: i.product.id,
        quantity: i.quantity,
      })),
      pickupCounter: 'Mostrador 1',
    };
  };

  return {
    items,
    customerName,
    setCustomerName,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalAmount,
    totalCount,
    isSubmitting,
    setIsSubmitting,
    cartOpen,
    setCartOpen,
    buildCreateOrderDTO,
  };
}
