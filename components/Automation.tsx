
import React, { useState } from 'react';
import { generateWorkflowSuggestion } from '../services/gemini';

const Automation: React.FC = () => {
  const [painPoint, setPainPoint] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetSuggestion = async () => {
    if (!painPoint) return;
    setLoading(true);
    try {
      const res = await generateWorkflowSuggestion(painPoint);
      setSuggestion(res || '');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const workflows = [
    { id: 1, name: 'Abandoned Cart Recovery', trigger: 'Cart abandoned', action: 'Send 10% discount email', status: 'Active' },
    { id: 2, name: 'High-Value Order Alert', trigger: 'Order > $500', action: 'Slack notification', status: 'Paused' },
    { id: 3, name: 'Low Stock Auto-Replenish', trigger: 'Stock < 10', action: 'Draft purchase order', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Workflows */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold">Active Workflows</h3>
            <button className="text-sm font-semibold text-green-700 hover:underline">New Flow</button>
          </div>
          <div className="flex-1 divide-y divide-gray-100">
            {workflows.map(wf => (
              <div key={wf.id} className="p-6 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-lg ${wf.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm">{wf.name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      wf.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'
                    }`}>
                      {wf.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    <span className="font-medium text-slate-600">If:</span> {wf.trigger} → <span className="font-medium text-slate-600">Then:</span> {wf.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Workflow Designer */}
        <div className="bg-slate-900 text-white rounded-xl p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">AI Workflow Designer</h3>
            <p className="text-slate-400 text-sm mb-6">Describe a manual task or pain point, and let AI build the automation for you.</p>
            
            <div className="space-y-4 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Your Pain Point</label>
              <textarea 
                value={painPoint}
                onChange={(e) => setPainPoint(e.target.value)}
                placeholder="e.g., I spend too much time manually checking for returns and sending refund confirmations."
                className="w-full bg-slate-800 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-green-500 transition-shadow min-h-[100px]"
              />
              <button 
                onClick={handleGetSuggestion}
                disabled={loading || !painPoint}
                className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:hover:bg-green-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    Generate Magic Flow
                  </>
                )}
              </button>
            </div>

            {suggestion && (
              <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 animate-in slide-in-from-bottom-2 duration-300">
                <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2">AI Suggestion</h4>
                <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {suggestion}
                </div>
                <button className="mt-4 text-xs font-bold text-white hover:text-green-400 flex items-center gap-1 transition-colors">
                  Create Flow from this →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <h3 className="text-lg font-bold mb-4">Integrations</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {['Shopify', 'Slack', 'Mailchimp', 'QuickBooks', 'Twilio', 'ShipStation'].map(brand => (
            <div key={brand} className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 cursor-pointer transition-all">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 border border-gray-100 shadow-sm">
                <span className="text-xs font-bold">{brand[0]}</span>
              </div>
              <span className="text-[10px] font-medium text-gray-500">{brand}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2 cursor-pointer transition-all">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 border border-green-100 border-dashed">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-[10px] font-medium text-green-600">Connect</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automation;
