/**
 * @license
 * Presentation Layer: useOrders Hook
 * Consumes GetOrdersUseCase and UpdateOrderStatusUseCase.
 */

import { useState, useEffect, useCallback } from 'react';
import { appContainer } from '../../core/di/container.ts';
import { Order, OrderJSON } from '../../core/domain/entities/Order.ts';
import { OrderStatusType } from '../../core/domain/value-objects/OrderStatus.ts';
import { OrdersKPIs } from '../../core/application/use-cases/GetOrdersUseCase.ts';
import { CreateOrderDTO } from '../../core/application/dtos/index.ts';

export function useOrders() {
  const [orders, setOrders] = useState<OrderJSON[]>([]);
  const [kpis, setKpis] = useState<OrdersKPIs>({
    totalActive: 4,
    preparingCount: 3,
    readyCount: 1,
    deliveredToday: 24,
    onTimePercentage: 94,
    avgWaitTimeMinutes: 4,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [lastDeliveredOrder, setLastDeliveredOrder] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const domainOrders = await appContainer.getOrdersUseCase.execute(false);
      setOrders(domainOrders.map((o: Order) => o.toJSON()));
      
      const metrics = await appContainer.getOrdersUseCase.getKPIs();
      setKpis(metrics);
    } catch (err: unknown) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();

    const unsubscribe = appContainer.notificationService.subscribe((event) => {
      if (
        event.type === 'ORDER_CREATED' ||
        event.type === 'ORDER_STATUS_CHANGED' ||
        event.type === 'ORDER_DELIVERED'
      ) {
        fetchOrders();
      }
    });

    return () => unsubscribe();
  }, [fetchOrders]);

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatusType): Promise<OrderJSON> => {
    const updated = await appContainer.updateOrderStatusUseCase.execute(orderId, newStatus);
    await fetchOrders();
    if (newStatus === OrderStatusType.DELIVERED) {
      setLastDeliveredOrder(updated.orderNumber);
    }
    return updated.toJSON();
  };

  const createOrder = async (dto: CreateOrderDTO): Promise<OrderJSON> => {
    const created = await appContainer.createOrderUseCase.execute(dto);
    await fetchOrders();
    return created.toJSON();
  };

  return {
    orders,
    kpis,
    loading,
    lastDeliveredOrder,
    refreshOrders: fetchOrders,
    updateOrderStatus,
    createOrder,
  };
}
