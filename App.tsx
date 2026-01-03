
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import InventoryERP from './components/InventoryERP';
import POS from './components/POS';
import Automation from './components/Automation';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'erp': return <InventoryERP />;
      case 'pos': return <POS />;
      case 'automation': return <Automation />;
      case 'settings': return (
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold mb-4">Settings</h3>
          <p className="text-gray-500">Global application configurations and Shopify API webhooks management.</p>
        </div>
      );
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
