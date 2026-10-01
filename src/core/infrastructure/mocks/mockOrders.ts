/**
 * @license
 * Infrastructure Layer: Mock Orders Data
 * Mirrors the incoming cafeteria queue from the Express-Bite operations specification.
 */

import { Order, OrderItem } from '../../domain/entities/Order.ts';
import { Money } from '../../domain/value-objects/Money.ts';
import { OrderStatus } from '../../domain/value-objects/OrderStatus.ts';

export const INITIAL_MOCK_ORDERS: Order[] = [
  new Order({
    id: 'ord-041',
    orderNumber: '#041',
    customerName: 'Camila Valenzuela',
    items: [
      new OrderItem({
        productId: 'prod-1',
        productName: 'Café Latte Artesanal',
        unitPrice: new Money(1850),
        quantity: 1,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN3ceAANz6N3-YargPo2sDu0vlzvrDyA-Qm7WCpnzJOJnlFT5cEWjBJnQHrCOqjkLCyVwrvIPdTsjIRxARFrC9hZ6V8qq3VzHrVqmOSV3YfYwtRaufm1v-40yWykQpQvS-_gSuVfpWJE00VyrNn2o2Y_D6sr_RaMfC80XTQMfuu_QfYavmLf2JJUF9XscA1uBbY0ZbfQG7cxOpDnou_Hd6Et3rFXZD5ppRJBXc8YWO3XCFFSM6ghoC',
      }),
      new OrderItem({
        productId: 'prod-2',
        productName: 'Empanada de Pino',
        unitPrice: new Money(1600),
        quantity: 1,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCAN6s1vdiRcwHhkiHv34s3Jg3RXbFHTCADd5Q0s_mSVjhF7ZhJPNUO8iRIMrcTURnbpOrAswEYq0HgUJwtFzvFVxss2oanb5MRHpRnecr4EdAcahQt6xqHv2nJrkYlRF4b8BDRQq2LKn0cKo9Sp5sIhBxCCSkZzU0yWEAg7pkwSJtfvqTOkKVNgAGPVjV2DuWB3oDDaZHjC6vomcd8F-eZr7Xt6AP-7iJ78Uq7iFHT0T1uc2mMh5b',
      }),
    ],
    status: OrderStatus.PREPARING,
    createdAt: new Date(Date.now() - 3 * 60 * 1000), // 3 min ago
    pickupCounter: 'Mostrador 1',
  }),
  new Order({
    id: 'ord-042',
    orderNumber: '#042',
    customerName: 'Mateo Ríos',
    items: [
      new OrderItem({
        productId: 'prod-4',
        productName: 'Sándwich Ciabatta Gourmet',
        unitPrice: new Money(2900),
        quantity: 1,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN4wiI5zogXw42xxXWiYHc-He6rSQk6gh8OZOebk5z8rGMqR-gCndtsvu2HLO-yKda0M0dRpZ3wVSfIoNUd7ZmkH9VolC3foo2QEdZIY9PcaycTfZvCK3GftiWVPvITPn38ZLoujD3p5f4-hoDzNZMZxHz2F0hNbS_zam9AZOZBaBs7_gE--aOEzs-Z5J2-CDWtjXgFu_EjYyjOjhhVLMa5igTeRgOkQVkrGZ8f_L-9kx4PNqFSVpl',
      }),
      new OrderItem({
        productId: 'prod-3',
        productName: 'Jugo Naranja Fresco',
        unitPrice: new Money(1400),
        quantity: 1,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkiAnZuuabFRY2urs1XFwx3D3Wy0VHtP_Usqveq2xkpR8AXfbJVmbeOaYwZP3FsBfYeQWE0NqC020pg0SQLqk9TQlHf_L9448VWOLzeHpxyvvSjZyT-ZNNDYni-RV8IqhIRm_JVVq6GDbnROovPnSYUlnvUwLJF8SN4cXsZxZskSU8DIBYNZJ5hIKoOOjRNZOmBU5kiLTEk7j4_0Lbo-YIj5YFngZOTx-mw8lim3frFwfFL8Z5TOFI',
      }),
    ],
    status: OrderStatus.PREPARING,
    createdAt: new Date(Date.now() - 2 * 60 * 1000), // 2 min ago
    pickupCounter: 'Mostrador 1',
  }),
  new Order({
    id: 'ord-043',
    orderNumber: '#043',
    customerName: 'Ignacio Soto',
    items: [
      new OrderItem({
        productId: 'prod-2',
        productName: 'Empanada de Queso',
        unitPrice: new Money(1600),
        quantity: 2,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCAN6s1vdiRcwHhkiHv34s3Jg3RXbFHTCADd5Q0s_mSVjhF7ZhJPNUO8iRIMrcTURnbpOrAswEYq0HgUJwtFzvFVxss2oanb5MRHpRnecr4EdAcahQt6xqHv2nJrkYlRF4b8BDRQq2LKn0cKo9Sp5sIhBxCCSkZzU0yWEAg7pkwSJtfvqTOkKVNgAGPVjV2DuWB3oDDaZHjC6vomcd8F-eZr7Xt6AP-7iJ78Uq7iFHT0T1uc2mMh5b',
      }),
    ],
    status: OrderStatus.READY,
    createdAt: new Date(Date.now() - 1 * 60 * 1000), // 1 min ago
    pickupCounter: 'Mostrador 1',
  }),
  new Order({
    id: 'ord-044',
    orderNumber: '#044',
    customerName: 'Sofía Morales',
    items: [
      new OrderItem({
        productId: 'prod-1',
        productName: 'Café Latte Artesanal',
        unitPrice: new Money(1850),
        quantity: 1,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN3ceAANz6N3-YargPo2sDu0vlzvrDyA-Qm7WCpnzJOJnlFT5cEWjBJnQHrCOqjkLCyVwrvIPdTsjIRxARFrC9hZ6V8qq3VzHrVqmOSV3YfYwtRaufm1v-40yWykQpQvS-_gSuVfpWJE00VyrNn2o2Y_D6sr_RaMfC80XTQMfuu_QfYavmLf2JJUF9XscA1uBbY0ZbfQG7cxOpDnou_Hd6Et3rFXZD5ppRJBXc8YWO3XCFFSM6ghoC',
      }),
      new OrderItem({
        productId: 'prod-4',
        productName: 'Ciabatta Gourmet',
        unitPrice: new Money(2900),
        quantity: 1,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN4wiI5zogXw42xxXWiYHc-He6rSQk6gh8OZOebk5z8rGMqR-gCndtsvu2HLO-yKda0M0dRpZ3wVSfIoNUd7ZmkH9VolC3foo2QEdZIY9PcaycTfZvCK3GftiWVPvITPn38ZLoujD3p5f4-hoDzNZMZxHz2F0hNbS_zam9AZOZBaBs7_gE--aOEzs-Z5J2-CDWtjXgFu_EjYyjOjhhVLMa5igTeRgOkQVkrGZ8f_L-9kx4PNqFSVpl',
      }),
    ],
    status: OrderStatus.PREPARING,
    createdAt: new Date(), // Just entered
    pickupCounter: 'Mostrador 2',
  }),
];
