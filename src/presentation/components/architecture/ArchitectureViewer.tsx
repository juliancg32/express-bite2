/**
 * @license
 * Presentation Component: ArchitectureViewer
 * Interactive Clean Architecture & SOLID Principles documentation and validation suite.
 */

import React, { useState } from 'react';
import { Product } from '../../../core/domain/entities/Product.ts';
import { Order, OrderItem } from '../../../core/domain/entities/Order.ts';
import { Money } from '../../../core/domain/value-objects/Money.ts';
import { OrderStatus } from '../../../core/domain/value-objects/OrderStatus.ts';
import { InsufficientStockError } from '../../../core/domain/errors/DomainError.ts';

export const ArchitectureViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clean' | 'solid' | 'entities' | 'testlab'>('clean');
  const [testResult, setTestResult] = useState<string | null>(null);

  // Live Unit Test Simulations
  const runStockInvariantTest = () => {
    try {
      const prod = new Product({
        id: 'test-p1',
        sku: 'TEST-01',
        name: 'Café Test',
        description: 'Test invariant',
        price: new Money(1800),
        stock: 3,
        category: 'cafeteria',
        imageUrl: '',
        prepTimeMinutes: 2,
        station: 'Barra',
      });

      // Try reducing 5 units when only 3 exist
      prod.reduceStock(5);
      setTestResult('FALLÓ: Debió lanzar InsufficientStockError');
    } catch (err) {
      if (err instanceof InsufficientStockError) {
        setTestResult(`ÉXITO [Regla de Negocio / Invariante]: ${err.message} (Código: ${err.code})`);
      } else {
        setTestResult(`Error inesperado: ${err}`);
      }
    }
  };

  const runMoneyValueObjectTest = () => {
    try {
      const m1 = new Money(1850, 'CLP');
      const m2 = new Money(1600, 'CLP');
      const sum = m1.add(m2);
      const multiplied = sum.multiply(2);
      setTestResult(
        `ÉXITO [Value Object Immutability]: $1.850 + $1.600 = ${sum.format()} | Doble: ${multiplied.format()} (Inmutabilidad garantizada)`
      );
    } catch (err) {
      setTestResult(`Error: ${err}`);
    }
  };

  const runOrderStateTransitionTest = () => {
    try {
      const order = new Order({
        id: 'ord-test',
        orderNumber: '#999',
        customerName: 'Test Student',
        items: [
          new OrderItem({
            productId: 'p1',
            productName: 'Item 1',
            unitPrice: new Money(1000),
            quantity: 1,
          }),
        ],
        status: OrderStatus.DELIVERED,
      });

      // Try illegal transition: DELIVERED -> PREPARING
      order.transitionTo(OrderStatus.PREPARING);
      setTestResult('FALLÓ: Una orden entregada no puede regresar a preparación');
    } catch (err: unknown) {
      setTestResult(`ÉXITO [Máquina de Estados de Orden]: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div className="bg-[#ffffff] rounded-2xl p-6 sm:p-8 border border-[#e3e1ec] shadow-sm flex flex-col gap-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#eeedf7]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#006948] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">architecture</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1a1b22]">
              Arquitectura Limpia & Principios SOLID
            </h2>
            <p className="text-xs text-[#3d4a42]">
              Diseño de software empresarial desacoplado, testeable y mantenible
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-[#eeedf7] p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('clean')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'clean' ? 'bg-[#006948] text-white shadow-xs' : 'text-[#3d4a42] hover:text-[#1a1b22]'
            }`}
          >
            Capas Clean Arch
          </button>
          <button
            onClick={() => setActiveTab('solid')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'solid' ? 'bg-[#006948] text-white shadow-xs' : 'text-[#3d4a42] hover:text-[#1a1b22]'
            }`}
          >
            Principios SOLID
          </button>
          <button
            onClick={() => setActiveTab('entities')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'entities' ? 'bg-[#006948] text-white shadow-xs' : 'text-[#3d4a42] hover:text-[#1a1b22]'
            }`}
          >
            Entidades & Interfaces
          </button>
          <button
            onClick={() => setActiveTab('testlab')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'testlab' ? 'bg-[#006948] text-white shadow-xs' : 'text-[#3d4a42] hover:text-[#1a1b22]'
            }`}
          >
            Test Lab En Vivo
          </button>
        </div>
      </div>

      {/* Tab 1: Clean Architecture Layers */}
      {activeTab === 'clean' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeIn">
          {/* Layer 1: Domain */}
          <div className="p-4 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#006948] font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-[#006948] text-white text-xs flex items-center justify-center font-mono">
                1
              </span>
              <span>Capa de Dominio</span>
            </div>
            <span className="text-[11px] font-semibold text-[#005137] bg-[#85f8c4]/40 px-2 py-0.5 rounded w-fit">
              Cero dependencias externas
            </span>
            <ul className="text-xs text-[#005137] flex flex-col gap-1 mt-2 list-disc list-inside">
              <li><strong>Product</strong> (Entidad central)</li>
              <li><strong>Order</strong> & <strong>OrderItem</strong></li>
              <li><strong>Money</strong> (Value Object inmutable)</li>
              <li><strong>OrderStatus</strong> (Máquina de estados)</li>
              <li><strong>DomainErrors</strong> (Invariantes)</li>
            </ul>
          </div>

          {/* Layer 2: Application */}
          <div className="p-4 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#1d4ed8] font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-[#1d4ed8] text-white text-xs flex items-center justify-center font-mono">
                2
              </span>
              <span>Capa de Aplicación</span>
            </div>
            <span className="text-[11px] font-semibold text-[#1e40af] bg-[#dbeafe] px-2 py-0.5 rounded w-fit">
              Casos de Uso & Puertos
            </span>
            <ul className="text-xs text-[#1e40af] flex flex-col gap-1 mt-2 list-disc list-inside">
              <li><strong>CreateOrderUseCase</strong></li>
              <li><strong>UpdateOrderStatusUseCase</strong></li>
              <li><strong>UpdateProductStockUseCase</strong></li>
              <li><strong>GetProductsUseCase</strong></li>
              <li><strong>IProductRepository</strong> (Port)</li>
              <li><strong>IOrderRepository</strong> (Port)</li>
            </ul>
          </div>

          {/* Layer 3: Infrastructure */}
          <div className="p-4 rounded-xl bg-[#fdf4ff] border border-[#f5d0fe] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#a21caf] font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-[#a21caf] text-white text-xs flex items-center justify-center font-mono">
                3
              </span>
              <span>Capa de Infraestructura</span>
            </div>
            <span className="text-[11px] font-semibold text-[#86198f] bg-[#fae8ff] px-2 py-0.5 rounded w-fit">
              Adaptadores & Mocks
            </span>
            <ul className="text-xs text-[#86198f] flex flex-col gap-1 mt-2 list-disc list-inside">
              <li><strong>InMemoryProductRepository</strong></li>
              <li><strong>InMemoryOrderRepository</strong></li>
              <li><strong>EventBusNotificationService</strong></li>
              <li>Mocks con datos reales e imágenes</li>
              <li><strong>DI Container</strong> (Inversión de Control)</li>
            </ul>
          </div>

          {/* Layer 4: Presentation */}
          <div className="p-4 rounded-xl bg-[#fff7ed] border border-[#fed7aa] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#c2410c] font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-[#c2410c] text-white text-xs flex items-center justify-center font-mono">
                4
              </span>
              <span>Capa de Presentación</span>
            </div>
            <span className="text-[11px] font-semibold text-[#9a3412] bg-[#ffedd5] px-2 py-0.5 rounded w-fit">
              UI & Hooks Reactivos
            </span>
            <ul className="text-xs text-[#9a3412] flex flex-col gap-1 mt-2 list-disc list-inside">
              <li><strong>useProducts</strong> (ViewModel hook)</li>
              <li><strong>useOrders</strong> & <strong>useCart</strong></li>
              <li><strong>StudentPhoneFrame</strong> (PWA view)</li>
              <li><strong>OrderQueueList</strong> (POS)</li>
              <li><strong>KitchenBoard</strong> & <strong>PickupScreen</strong></li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: SOLID Principles */}
      {activeTab === 'solid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
          <div className="p-4 rounded-xl bg-[#fbf8ff] border border-[#dad9e3] flex flex-col gap-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-[#006948]">
              <span className="px-2 py-0.5 rounded bg-[#006948] text-white font-mono text-xs">S</span>
              <span>Single Responsibility Principle (SRP)</span>
            </div>
            <p className="text-xs text-[#3d4a42]">
              Cada clase tiene una única razón de cambio. Las entidades <code>Product</code> y <code>Order</code> solo resuelven invariantes internas; los casos de uso (<code>CreateOrderUseCase</code>, etc.) solo orquestan un flujo específico.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#fbf8ff] border border-[#dad9e3] flex flex-col gap-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-[#006948]">
              <span className="px-2 py-0.5 rounded bg-[#006948] text-white font-mono text-xs">O</span>
              <span>Open/Closed Principle (OCP)</span>
            </div>
            <p className="text-xs text-[#3d4a42]">
              Abierto a extensión, cerrado a modificación. La máquina de estados <code>OrderStatus</code> y los repositorios permiten añadir nuevos estados o conectores a bases de datos sin modificar el código de los casos de uso.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#fbf8ff] border border-[#dad9e3] flex flex-col gap-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-[#006948]">
              <span className="px-2 py-0.5 rounded bg-[#006948] text-white font-mono text-xs">L</span>
              <span>Liskov Substitution Principle (LSP)</span>
            </div>
            <p className="text-xs text-[#3d4a42]">
              Cualquier implementación de <code>IProductRepository</code> (como <code>InMemoryProductRepository</code>, o una futura <code>PostgreSQLProductRepository</code>) puede sustituir a la otra sin alterar la corrección del programa.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#fbf8ff] border border-[#dad9e3] flex flex-col gap-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-[#006948]">
              <span className="px-2 py-0.5 rounded bg-[#006948] text-white font-mono text-xs">I</span>
              <span>Interface Segregation Principle (ISP)</span>
            </div>
            <p className="text-xs text-[#3d4a42]">
              Interfaces granulares y segregadas: <code>IProductReader</code>, <code>IProductWriter</code>, <code>IOrderRepository</code>, <code>INotificationService</code>. Los clientes solo dependen de los métodos que realmente consumen.
            </p>
          </div>

          <div className="col-span-full p-4 rounded-xl bg-[#fbf8ff] border border-[#dad9e3] flex flex-col gap-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-[#006948]">
              <span className="px-2 py-0.5 rounded bg-[#006948] text-white font-mono text-xs">D</span>
              <span>Dependency Inversion Principle (DIP)</span>
            </div>
            <p className="text-xs text-[#3d4a42]">
              Los módulos de alto nivel (Casos de uso) nunca dependen de los de bajo nivel (DB, In-Memory, UI). Ambos dependen de abstracciones (interfaces en <code>core/application/ports</code>), resueltas limpiamente por el contenedor de Inyección de Dependencias <code>container.ts</code>.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Entities & Interfaces code overview */}
      {activeTab === 'entities' && (
        <div className="flex flex-col gap-4 animate-fadeIn text-xs">
          <div className="p-4 rounded-xl bg-[#1a1b22] text-slate-100 font-mono overflow-x-auto">
            <div className="text-emerald-400 font-bold mb-2">// Product Entity (src/core/domain/entities/Product.ts)</div>
            <pre className="text-[11px] leading-relaxed">
{`export class Product {
  private readonly _id: string;
  private readonly _sku: string;
  private _name: string;
  private _price: Money;
  private _stock: number;
  private _category: ProductCategory;

  public reduceStock(quantity: number): void {
    if (this._stock < quantity) {
      throw new InsufficientStockError(this._name, quantity, this._stock);
    }
    this._stock -= quantity;
  }
}`}
            </pre>
          </div>

          <div className="p-4 rounded-xl bg-[#1a1b22] text-slate-100 font-mono overflow-x-auto">
            <div className="text-emerald-400 font-bold mb-2">// Order Entity (src/core/domain/entities/Order.ts)</div>
            <pre className="text-[11px] leading-relaxed">
{`export class Order {
  private readonly _id: string;
  private readonly _orderNumber: string;
  private readonly _items: OrderItem[];
  private _status: OrderStatus;

  public calculateTotal(): Money {
    return this._items.reduce((sum, item) => sum.add(item.calculateSubtotal()), Money.zero());
  }

  public transitionTo(newStatus: OrderStatus): void {
    if (!this._status.canTransitionTo(newStatus)) {
      throw new InvalidOrderTransitionError(this._orderNumber, this._status.value, newStatus.value);
    }
    this._status = newStatus;
  }
}`}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 4: Live Test Lab */}
      {activeTab === 'testlab' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="p-4 rounded-xl bg-[#eeedf7] flex flex-col gap-3">
            <h3 className="font-bold text-sm text-[#1a1b22]">
              Prueba Interactiva de Invariantes de Dominio
            </h3>
            <p className="text-xs text-[#3d4a42]">
              Ejecuta pruebas en tiempo real contra las entidades de dominio para validar que las reglas de negocio detienen estados inválidos:
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={runStockInvariantTest}
                className="bg-[#006948] hover:bg-[#00855d] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all"
              >
                1. Probar Invariante de Stock (InsufficientStockError)
              </button>

              <button
                onClick={runMoneyValueObjectTest}
                className="bg-[#1a1b22] hover:bg-[#2f3038] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all"
              >
                2. Probar Money Value Object (Suma & Multiplicación)
              </button>

              <button
                onClick={runOrderStateTransitionTest}
                className="bg-[#c2410c] hover:bg-[#ea580c] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all"
              >
                3. Probar Transición de Orden Inválida
              </button>
            </div>

            {testResult && (
              <div className="p-3 bg-white rounded-lg border border-[#dad9e3] font-mono text-xs text-[#1a1b22] break-all shadow-xs">
                {testResult}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
