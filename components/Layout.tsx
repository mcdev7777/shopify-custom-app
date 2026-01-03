
import React from 'react';
import { Icons, COLORS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Icons.Dashboard /> },
    { id: 'erp', label: 'ERP & Inventory', icon: <Icons.Inventory /> },
    { id: 'pos', label: 'Point of Sale', icon: <Icons.POS /> },
    { id: 'automation', label: 'Automations', icon: <Icons.Automation /> },
    { id: 'settings', label: 'Settings', icon: <Icons.Settings /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">CustomSuite</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 py-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
              <img src="https://picsum.photos/seed/admin/40" alt="Avatar" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold truncate">Admin User</p>
              <p className="text-[10px] text-gray-500 truncate">Store Owner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-lg font-semibold capitalize">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <button className="text-sm font-medium text-green-700 hover:underline">View Store</button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-[#f6f6f7]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
