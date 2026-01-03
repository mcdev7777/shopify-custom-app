
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { getPricingIntelligence } from '../services/gemini';

const InventoryERP: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [aiPricing, setAiPricing] = useState<{ suggestedPrice: number; reasoning: string[] } | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyzePricing = async (product: Product) => {
    setSelectedProduct(product);
    setAnalyzing(true);
    setAiPricing(null);
    try {
      const result = await getPricingIntelligence(product);
      setAiPricing(result);
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search inventory..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
          />
        </div>
        <button className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-800 transition-shadow shadow-sm">
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Inventory</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image} className="w-10 h-10 rounded-md object-cover bg-gray-100" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{p.title}</p>
                      <p className="text-xs text-gray-500">{p.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <span className={p.inventoryQuantity < 10 ? 'text-red-600 font-bold' : ''}>
                    {p.inventoryQuantity} in stock
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                  ${p.price.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleAnalyzePricing(p)}
                    className="text-green-700 text-xs font-semibold hover:underline flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    AI Pricing
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold">AI Pricing Intelligence</h3>
              <button onClick={() => setSelectedProduct(null)} className="text-gray-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img src={selectedProduct.image} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className="font-semibold text-slate-800">{selectedProduct.title}</h4>
                  <p className="text-sm text-gray-500">Current: ${selectedProduct.price.toFixed(2)} | Cost: ${selectedProduct.cost.toFixed(2)}</p>
                </div>
              </div>

              {analyzing ? (
                <div className="py-8 flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-500 font-medium">Analyzing market trends & inventory levels...</p>
                </div>
              ) : aiPricing && (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <p className="text-xs text-green-700 font-bold uppercase tracking-wider mb-1">Recommended Price</p>
                    <p className="text-3xl font-bold text-green-900">${aiPricing.suggestedPrice.toFixed(2)}</p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-700">Why this price?</p>
                    <ul className="space-y-2">
                      {aiPricing.reasoning.map((reason, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-gray-600">
                          <span className="text-green-600 font-bold">•</span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="flex-1 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50"
              >
                Discard
              </button>
              <button 
                className="flex-1 px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-800 shadow-sm"
              >
                Apply Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryERP;
