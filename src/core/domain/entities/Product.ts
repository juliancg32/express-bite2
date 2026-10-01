/**
 * @license
 * Clean Architecture & SOLID Principles
 * Domain Layer: Product Entity
 * 
 * SOLID adherence:
 * - Single Responsibility Principle (SRP): Encapsulates only Product state invariants & stock logic.
 * - Open/Closed Principle (OCP): State rules can be extended without breaking contracts.
 */

import { Money } from '../value-objects/Money.ts';
import { InsufficientStockError } from '../errors/DomainError.ts';

export type ProductCategory = 'todo' | 'cafeteria' | 'horno' | 'bebidas' | 'snacks';

export interface ProductProps {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: Money;
  stock: number;
  category: ProductCategory;
  imageUrl: string;
  tag?: string;
  prepTimeMinutes: number;
  station: string; // e.g. "Cafetería Especialidad", "Horno Central", "Bebidas Naturales"
}

export interface ProductJSON {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  formattedPrice: string;
  stock: number;
  category: ProductCategory;
  imageUrl: string;
  tag?: string;
  isAvailable: boolean;
  isLowStock: boolean;
  prepTimeMinutes: number;
  station: string;
}

export class Product {
  private readonly _id: string;
  private readonly _sku: string;
  private _name: string;
  private _description: string;
  private _price: Money;
  private _stock: number;
  private _category: ProductCategory;
  private _imageUrl: string;
  private _tag?: string;
  private _prepTimeMinutes: number;
  private _station: string;

  constructor(props: ProductProps) {
    if (!props.id || props.id.trim() === '') {
      throw new Error('Product ID cannot be empty');
    }
    if (!props.name || props.name.trim() === '') {
      throw new Error('Product name cannot be empty');
    }
    if (props.stock < 0) {
      throw new Error('Initial stock cannot be negative');
    }

    this._id = props.id;
    this._sku = props.sku;
    this._name = props.name;
    this._description = props.description;
    this._price = props.price;
    this._stock = props.stock;
    this._category = props.category;
    this._imageUrl = props.imageUrl;
    this._tag = props.tag;
    this._prepTimeMinutes = props.prepTimeMinutes;
    this._station = props.station;
  }

  // Getters
  public get id(): string { return this._id; }
  public get sku(): string { return this._sku; }
  public get name(): string { return this._name; }
  public get description(): string { return this._description; }
  public get price(): Money { return this._price; }
  public get stock(): number { return this._stock; }
  public get category(): ProductCategory { return this._category; }
  public get imageUrl(): string { return this._imageUrl; }
  public get tag(): string | undefined { return this._tag; }
  public get prepTimeMinutes(): number { return this._prepTimeMinutes; }
  public get station(): string { return this._station; }

  // Business logic methods
  public isAvailable(): boolean {
    return this._stock > 0;
  }

  public isLowStock(): boolean {
    return this._stock > 0 && this._stock <= 10;
  }

  public isOutOfStock(): boolean {
    return this._stock <= 0;
  }

  public reduceStock(quantity: number): void {
    if (quantity <= 0) {
      throw new Error('Quantity to reduce must be positive');
    }
    if (this._stock < quantity) {
      throw new InsufficientStockError(this._name, quantity, this._stock);
    }
    this._stock -= quantity;
  }

  public increaseStock(quantity: number): void {
    if (quantity <= 0) {
      throw new Error('Quantity to increase must be positive');
    }
    this._stock += quantity;
  }

  public updateStock(newStock: number): void {
    if (newStock < 0) {
      throw new Error('Stock cannot be negative');
    }
    this._stock = newStock;
  }

  public updateDetails(name: string, description: string, price: Money): void {
    if (!name.trim()) throw new Error('Name cannot be empty');
    this._name = name;
    this._description = description;
    this._price = price;
  }

  public toJSON(): ProductJSON {
    return {
      id: this._id,
      sku: this._sku,
      name: this._name,
      description: this._description,
      price: this._price.amount,
      formattedPrice: this._price.format(),
      stock: this._stock,
      category: this._category,
      imageUrl: this._imageUrl,
      tag: this._tag,
      isAvailable: this.isAvailable(),
      isLowStock: this.isLowStock(),
      prepTimeMinutes: this._prepTimeMinutes,
      station: this._station,
    };
  }
}
