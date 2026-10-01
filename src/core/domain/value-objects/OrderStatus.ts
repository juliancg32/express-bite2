/**
 * @license
 * Clean Architecture & SOLID Implementation
 * Domain Layer: OrderStatus Value Object & Enum
 */

export enum OrderStatusType {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface StatusMetadata {
  label: string;
  badgeBg: string;
  badgeText: string;
  dotColor: string;
  description: string;
}

export class OrderStatus {
  public static readonly PENDING = new OrderStatus(OrderStatusType.PENDING);
  public static readonly PREPARING = new OrderStatus(OrderStatusType.PREPARING);
  public static readonly READY = new OrderStatus(OrderStatusType.READY);
  public static readonly DELIVERED = new OrderStatus(OrderStatusType.DELIVERED);
  public static readonly CANCELLED = new OrderStatus(OrderStatusType.CANCELLED);

  private readonly _value: OrderStatusType;

  private constructor(value: OrderStatusType) {
    this._value = value;
  }

  public get value(): OrderStatusType {
    return this._value;
  }

  public canTransitionTo(next: OrderStatus): boolean {
    const validTransitions: Record<OrderStatusType, OrderStatusType[]> = {
      [OrderStatusType.PENDING]: [OrderStatusType.PREPARING, OrderStatusType.CANCELLED],
      [OrderStatusType.PREPARING]: [OrderStatusType.READY, OrderStatusType.CANCELLED],
      [OrderStatusType.READY]: [OrderStatusType.DELIVERED, OrderStatusType.CANCELLED],
      [OrderStatusType.DELIVERED]: [],
      [OrderStatusType.CANCELLED]: []
    };

    return validTransitions[this._value].includes(next.value);
  }

  public getMetadata(): StatusMetadata {
    switch (this._value) {
      case OrderStatusType.PENDING:
        return {
          label: 'Pendiente',
          badgeBg: 'bg-amber-100',
          badgeText: 'text-amber-800',
          dotColor: 'bg-amber-500',
          description: 'Recibido en sistema, esperando inicio en cocina'
        };
      case OrderStatusType.PREPARING:
        return {
          label: 'En Preparación',
          badgeBg: 'bg-amber-100',
          badgeText: 'text-amber-800',
          dotColor: 'bg-amber-500',
          description: 'Tu pedido está en cocina siendo elaborado'
        };
      case OrderStatusType.READY:
        return {
          label: '¡Listo en Barra!',
          badgeBg: 'bg-emerald-100',
          badgeText: 'text-emerald-800',
          dotColor: 'bg-emerald-600',
          description: 'Listo para retirar en mostrador principal'
        };
      case OrderStatusType.DELIVERED:
        return {
          label: 'Entregado',
          badgeBg: 'bg-slate-100',
          badgeText: 'text-slate-600',
          dotColor: 'bg-slate-400',
          description: 'Pedido despachado al estudiante con éxito'
        };
      case OrderStatusType.CANCELLED:
        return {
          label: 'Cancelado',
          badgeBg: 'bg-rose-100',
          badgeText: 'text-rose-800',
          dotColor: 'bg-rose-500',
          description: 'Pedido cancelado'
        };
    }
  }

  public equals(other: OrderStatus): boolean {
    return this._value === other.value;
  }

  public static fromString(val: string): OrderStatus {
    const found = Object.values(OrderStatusType).find(t => t === val.toUpperCase());
    if (!found) {
      throw new Error(`Invalid order status string: ${val}`);
    }
    return new OrderStatus(found as OrderStatusType);
  }
}
