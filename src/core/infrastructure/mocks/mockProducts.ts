/**
 * @license
 * Infrastructure Layer: Mock Product Data
 * Real images linked directly from the HTML mockup and user assets.
 */

import { Product } from '../../domain/entities/Product.ts';
import { Money } from '../../domain/value-objects/Money.ts';

export const INITIAL_MOCK_PRODUCTS: Product[] = [
  new Product({
    id: 'prod-1',
    sku: 'CAF-LAT-01',
    name: 'Café Latte Artesanal',
    description: 'Doble shot de espresso premium, leche emulsionada y latte art.',
    price: new Money(1850),
    stock: 42,
    category: 'cafeteria',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN3ceAANz6N3-YargPo2sDu0vlzvrDyA-Qm7WCpnzJOJnlFT5cEWjBJnQHrCOqjkLCyVwrvIPdTsjIRxARFrC9hZ6V8qq3VzHrVqmOSV3YfYwtRaufm1v-40yWykQpQvS-_gSuVfpWJE00VyrNn2o2Y_D6sr_RaMfC80XTQMfuu_QfYavmLf2JJUF9XscA1uBbY0ZbfQG7cxOpDnou_Hd6Et3rFXZD5ppRJBXc8YWO3XCFFSM6ghoC',
    tag: 'Tostado Intenso',
    prepTimeMinutes: 3,
    station: 'Cafetería Especialidad',
  }),
  new Product({
    id: 'prod-2',
    sku: 'HOR-EMP-02',
    name: 'Empanada Horneada',
    description: 'Masa fina horneada con relleno tradicional de pino o queso fundido.',
    price: new Money(1600),
    stock: 18,
    category: 'horno',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCAN6s1vdiRcwHhkiHv34s3Jg3RXbFHTCADd5Q0s_mSVjhF7ZhJPNUO8iRIMrcTURnbpOrAswEYq0HgUJwtFzvFVxss2oanb5MRHpRnecr4EdAcahQt6xqHv2nJrkYlRF4b8BDRQq2LKn0cKo9Sp5sIhBxCCSkZzU0yWEAg7pkwSJtfvqTOkKVNgAGPVjV2DuWB3oDDaZHjC6vomcd8F-eZr7Xt6AP-7iJ78Uq7iFHT0T1uc2mMh5b',
    tag: 'Horneada',
    prepTimeMinutes: 2,
    station: 'Horno Central',
  }),
  new Product({
    id: 'prod-3',
    sku: 'BEB-JUG-03',
    name: 'Jugo de Naranja Fresco',
    description: '100% natural, exprimido en frío 350ml con hielo al gusto.',
    price: new Money(1400),
    stock: 12, // Set to 12 initially, can be updated in Inventory
    category: 'bebidas',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkiAnZuuabFRY2urs1XFwx3D3Wy0VHtP_Usqveq2xkpR8AXfbJVmbeOaYwZP3FsBfYeQWE0NqC020pg0SQLqk9TQlHf_L9448VWOLzeHpxyvvSjZyT-ZNNDYni-RV8IqhIRm_JVVq6GDbnROovPnSYUlnvUwLJF8SN4cXsZxZskSU8DIBYNZJ5hIKoOOjRNZOmBU5kiLTEk7j4_0Lbo-YIj5YFngZOTx-mw8lim3frFwfFL8Z5TOFI',
    tag: '100% Natural',
    prepTimeMinutes: 2,
    station: 'Bebidas Naturales',
  }),
  new Product({
    id: 'prod-4',
    sku: 'SNK-CIA-04',
    name: 'Sándwich Ciabatta',
    description: 'Prosciutto curado, burrata fresca, tomate y rúcula en pan ciabatta artesanal.',
    price: new Money(2900),
    stock: 9,
    category: 'snacks',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN4wiI5zogXw42xxXWiYHc-He6rSQk6gh8OZOebk5z8rGMqR-gCndtsvu2HLO-yKda0M0dRpZ3wVSfIoNUd7ZmkH9VolC3foo2QEdZIY9PcaycTfZvCK3GftiWVPvITPn38ZLoujD3p5f4-hoDzNZMZxHz2F0hNbS_zam9AZOZBaBs7_gE--aOEzs-Z5J2-CDWtjXgFu_EjYyjOjhhVLMa5igTeRgOkQVkrGZ8f_L-9kx4PNqFSVpl',
    tag: 'Chef Choice',
    prepTimeMinutes: 4,
    station: 'Sándwiches Gourmet',
  }),
  new Product({
    id: 'prod-5',
    sku: 'PAS-MED-05',
    name: 'Medialuna Artesanal',
    description: 'Hojaldre dulce tradicional mantecoso recién horneado.',
    price: new Money(900),
    stock: 0, // In mock, shown as Agotado (0 uds)
    category: 'horno',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    tag: 'Pastelería',
    prepTimeMinutes: 1,
    station: 'Pastelería Matinal',
  }),
  new Product({
    id: 'prod-6',
    sku: 'CAF-ESP-06',
    name: 'Café Espresso en Grano',
    description: 'Bolsa de 250g de café de origen tostado en casa.',
    price: new Money(4500),
    stock: 42,
    category: 'cafeteria',
    imageUrl: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80',
    tag: 'Especialidad',
    prepTimeMinutes: 1,
    station: 'Cafetería Especialidad',
  }),
];
