
import React from 'react';

export const COLORS = {
  primary: '#008060', // Shopify Green
  secondary: '#f6f6f7',
  accent: '#005bd3',
  danger: '#d82c0d',
  warning: '#ffc453',
  success: '#008060',
};

export const MOCK_PRODUCTS: any[] = [
  { id: '1', title: 'Premium Cotton Tee', handle: 'premium-tee', status: 'active', inventoryQuantity: 124, price: 29.99, cost: 12.00, category: 'Apparel', image: 'https://picsum.photos/seed/tee/200' },
  { id: '2', title: 'Leather Bound Journal', handle: 'leather-journal', status: 'active', inventoryQuantity: 45, price: 45.00, cost: 18.00, category: 'Stationery', image: 'https://picsum.photos/seed/journal/200' },
  { id: '3', title: 'Wireless Bluetooth Earbuds', handle: 'earbuds', status: 'draft', inventoryQuantity: 0, price: 89.00, cost: 35.00, category: 'Electronics', image: 'https://picsum.photos/seed/buds/200' },
  { id: '4', title: 'Minimalist Wall Clock', handle: 'clock', status: 'active', inventoryQuantity: 8, price: 55.00, cost: 22.00, category: 'Home Decor', image: 'https://picsum.photos/seed/clock/200' },
  { id: '5', title: 'Organic Canvas Tote', handle: 'tote-bag', status: 'active', inventoryQuantity: 300, price: 15.00, cost: 4.50, category: 'Accessories', image: 'https://picsum.photos/seed/tote/200' },
];

export const MOCK_SALES_DATA = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 2000, orders: 12 },
  { name: 'Thu', sales: 2780, orders: 19 },
  { name: 'Fri', sales: 1890, orders: 14 },
  { name: 'Sat', sales: 2390, orders: 17 },
  { name: 'Sun', sales: 3490, orders: 21 },
];

export const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Inventory: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  POS: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  Automation: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};
