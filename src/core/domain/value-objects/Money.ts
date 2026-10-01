/**
 * @license
 * Clean Architecture & SOLID Implementation
 * Domain Layer: Value Object Money
 */

export class Money {
  private readonly _amount: number;
  private readonly _currency: string;

  constructor(amount: number, currency: string = 'CLP') {
    if (isNaN(amount) || amount < 0) {
      throw new Error(`Invalid money amount: ${amount}`);
    }
    // Round to prevent floating point inaccuracies
    this._amount = Math.round(amount);
    this._currency = currency;
  }

  public get amount(): number {
    return this._amount;
  }

  public get currency(): string {
    return this._currency;
  }

  public add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this._amount + other._amount, this._currency);
  }

  public multiply(multiplier: number): Money {
    if (multiplier < 0) {
      throw new Error('Multiplier cannot be negative');
    }
    return new Money(this._amount * multiplier, this._currency);
  }

  public equals(other: Money): boolean {
    return this._amount === other._amount && this._currency === other._currency;
  }

  public format(): string {
    // Formats e.g. 1850 -> "$1.850"
    return `$${this._amount.toLocaleString('es-CL')}`;
  }

  private assertSameCurrency(other: Money): void {
    if (this._currency !== other._currency) {
      throw new Error(`Currency mismatch: ${this._currency} vs ${other._currency}`);
    }
  }

  public static fromNumber(amount: number, currency: string = 'CLP'): Money {
    return new Money(amount, currency);
  }

  public static zero(currency: string = 'CLP'): Money {
    return new Money(0, currency);
  }
}
