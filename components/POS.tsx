
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

const POS: React.FC = () => {
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? {...item, quantity: item.quantity + 1} : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const categories = ['All', ...new Set(MOCK_PRODUCTS.map(p => p.category))];
  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6">
      {/* Product Selection */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto">
          {filteredProducts.map(p => (
            <button
              key={p.id}
              onClick={() => addToCart(p)}
              className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start text-left group"
            >
              <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-gray-50">
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                {p.inventoryQuantity < 5 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Low Stock
                  </span>
                )}
              </div>
              <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">{p.title}</h4>
              <p className="text-xs text-gray-500 mb-2">{p.category}</p>
              <p className="text-sm font-bold text-green-700">${p.price.toFixed(2)}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Cart/Checkout Sidebar */}
      <div className="w-96 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold">Current Order</h3>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 font-medium">#{Math.floor(Math.random() * 90000) + 10000}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-sm">Cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img src={item.product.image} className="w-12 h-12 rounded-lg bg-gray-50" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{item.product.title}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} x ${item.product.price.toFixed(2)}
                  </p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-3">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-slate-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button 
            disabled={cart.length === 0}
            className="w-full mt-4 py-4 bg-green-700 text-white rounded-xl font-bold text-lg hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-[0.98] transition-all"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default POS;
