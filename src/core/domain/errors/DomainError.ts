/**
 * @license
 * Clean Architecture Domain Errors
 */

export abstract class DomainError extends Error {
  public abstract readonly code: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InsufficientStockError extends DomainError {
  public readonly code = 'INSUFFICIENT_STOCK';

  constructor(productName: string, requested: number, available: number) {
    super(`Stock insuficiente para "${productName}". Solicitado: ${requested}, Disponible: ${available}`);
  }
}

export class InvalidOrderTransitionError extends DomainError {
  public readonly code = 'INVALID_ORDER_TRANSITION';

  constructor(orderId: string, currentStatus: string, attemptedStatus: string) {
    super(`Transición inválida para pedido ${orderId}: de "${currentStatus}" a "${attemptedStatus}"`);
  }
}

export class ProductNotFoundError extends DomainError {
  public readonly code = 'PRODUCT_NOT_FOUND';

  constructor(productId: string) {
    super(`Producto con ID ${productId} no fue encontrado`);
  }
}

export class OrderNotFoundError extends DomainError {
  public readonly code = 'ORDER_NOT_FOUND';

  constructor(orderId: string) {
    super(`Pedido con ID ${orderId} no fue encontrado`);
  }
}

export class EmptyOrderError extends DomainError {
  public readonly code = 'EMPTY_ORDER';

  constructor() {
    super('Un pedido debe contener al menos un producto');
  }
}
