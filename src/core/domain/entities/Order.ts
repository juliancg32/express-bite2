/**
 * @license
 * Clean Architecture & SOLID Principles
 * Domain Layer: Order Entity & OrderItem
 * 
 * SOLID adherence:
 * - Single Responsibility Principle (SRP): Enforces order validity, items coherence, and state machine transitions.
 * - Open/Closed Principle (OCP): State transition rules rely on OrderStatus value object.
 */

import { Money } from '../value-objects/Money.ts';
import { OrderStatus, OrderStatusType } from '../value-objects/OrderStatus.ts';
import { EmptyOrderError, InvalidOrderTransitionError } from '../errors/DomainError.ts';

export interface OrderItemProps {
  productId: string;
  productName: string;
  unitPrice: Money;
  quantity: number;
  imageUrl?: string;
  specialInstructions?: string;
}

export interface OrderItemJSON {
  productId: string;
  productName: string;
  unitPrice: number;
  formattedUnitPrice: string;
  quantity: number;
  subtotal: number;
  formattedSubtotal: string;
  imageUrl?: string;
  specialInstructions?: string;
}

export class OrderItem {
  private readonly _productId: string;
  private readonly _productName: string;
  private readonly _unitPrice: Money;
  private readonly _quantity: number;
  private readonly _imageUrl?: string;
  private readonly _specialInstructions?: string;

  constructor(props: OrderItemProps) {
    if (!props.productId) throw new Error('OrderItem must have a productId');
    if (props.quantity <= 0) throw new Error('OrderItem quantity must be greater than zero');

    this._productId = props.productId;
    this._productName = props.productName;
    this._unitPrice = props.unitPrice;
    this._quantity = props.quantity;
    this._imageUrl = props.imageUrl;
    this._specialInstructions = props.specialInstructions;
  }

  public get productId(): string { return this._productId; }
  public get productName(): string { return this._productName; }
  public get unitPrice(): Money { return this._unitPrice; }
  public get quantity(): number { return this._quantity; }
  public get imageUrl(): string | undefined { return this._imageUrl; }
  public get specialInstructions(): string | undefined { return this._specialInstructions; }

  public calculateSubtotal(): Money {
    return this._unitPrice.multiply(this._quantity);
  }

  public toJSON(): OrderItemJSON {
    const sub = this.calculateSubtotal();
    return {
      productId: this._productId,
      productName: this._productName,
      unitPrice: this._unitPrice.amount,
      formattedUnitPrice: this._unitPrice.format(),
      quantity: this._quantity,
      subtotal: sub.amount,
      formattedSubtotal: sub.format(),
      imageUrl: this._imageUrl,
      specialInstructions: this._specialInstructions,
    };
  }
}

export interface OrderProps {
  id: string;
  orderNumber: string; // e.g. "#041", "#042"
  customerName: string;
  items: OrderItem[];
  status?: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
  pickupCounter?: string;
  notes?: string;
}

export interface OrderJSON {
  id: string;
  orderNumber: string;
  customerName: string;
  items: OrderItemJSON[];
  total: number;
  formattedTotal: string;
  status: OrderStatusType;
  statusMetadata: ReturnType<OrderStatus['getMetadata']>;
  createdAt: string;
  updatedAt: string;
  pickupCounter: string;
  notes?: string;
  estimatedWaitMinutes: number;
  itemsSummary: string;
}

export class Order {
  private readonly _id: string;
  private readonly _orderNumber: string;
  private readonly _customerName: string;
  private readonly _items: OrderItem[];
  private _status: OrderStatus;
  private readonly _createdAt: Date;
  private _updatedAt: Date;
  private _pickupCounter: string;
  private _notes?: string;

  constructor(props: OrderProps) {
    if (!props.id) throw new Error('Order ID cannot be empty');
    if (!props.orderNumber) throw new Error('Order number cannot be empty');
    if (!props.customerName || !props.customerName.trim()) {
      throw new Error('Customer name cannot be empty');
    }
    if (!props.items || props.items.length === 0) {
      throw new EmptyOrderError();
    }

    this._id = props.id;
    this._orderNumber = props.orderNumber;
    this._customerName = props.customerName;
    this._items = [...props.items];
    this._status = props.status ?? OrderStatus.PENDING;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._pickupCounter = props.pickupCounter ?? 'Mostrador 1';
    this._notes = props.notes;
  }

  // Getters
  public get id(): string { return this._id; }
  public get orderNumber(): string { return this._orderNumber; }
  public get customerName(): string { return this._customerName; }
  public get items(): readonly OrderItem[] { return this._items; }
  public get status(): OrderStatus { return this._status; }
  public get createdAt(): Date { return this._createdAt; }
  public get updatedAt(): Date { return this._updatedAt; }
  public get pickupCounter(): string { return this._pickupCounter; }
  public get notes(): string | undefined { return this._notes; }

  public calculateTotal(): Money {
    return this._items.reduce(
      (sum, item) => sum.add(item.calculateSubtotal()),
      Money.zero()
    );
  }

  public transitionTo(newStatus: OrderStatus): void {
    if (!this._status.canTransitionTo(newStatus)) {
      throw new InvalidOrderTransitionError(this._orderNumber, this._status.value, newStatus.value);
    }
    this._status = newStatus;
    this._updatedAt = new Date();
  }

  public markAsDelivered(): void {
    // If not already READY, can advance to READY then DELIVERED if staff jumps directly
    if (this._status.value === OrderStatusType.PREPARING || this._status.value === OrderStatusType.PENDING) {
      this._status = OrderStatus.DELIVERED;
    } else {
      this.transitionTo(OrderStatus.DELIVERED);
    }
    this._updatedAt = new Date();
  }

  public markAsReady(): void {
    if (this._status.value === OrderStatusType.PENDING) {
      this.transitionTo(OrderStatus.PREPARING);
    }
    this.transitionTo(OrderStatus.READY);
    this._updatedAt = new Date();
  }

  public getEstimatedWaitMinutes(): number {
    // Heuristic: based on total items count
    const totalItems = this._items.reduce((acc, it) => acc + it.quantity, 0);
    return Math.max(2, Math.min(10, totalItems * 2));
  }

  public getItemsSummary(): string {
    return this._items.map(i => `${i.quantity}x ${i.productName}`).join(' • ');
  }

  public toJSON(): OrderJSON {
    const total = this.calculateTotal();
    return {
      id: this._id,
      orderNumber: this._orderNumber,
      customerName: this._customerName,
      items: this._items.map(it => it.toJSON()),
      total: total.amount,
      formattedTotal: total.format(),
      status: this._status.value,
      statusMetadata: this._status.getMetadata(),
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString(),
      pickupCounter: this._pickupCounter,
      notes: this._notes,
      estimatedWaitMinutes: this.getEstimatedWaitMinutes(),
      itemsSummary: this.getItemsSummary(),
    };
  }
}
