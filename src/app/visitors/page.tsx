'use client';

import { useState } from 'react';
import { Users, Search, QrCode } from 'lucide-react';

import VisitorQr from '@/components/visitor/visitorqr';
import VisitorSearch from '@/components/visitor/visitorsearch';
import VisitorTable, { VisitorLog } from '@/components/visitor/visitortable';

export default function VisitorPage() {
  const [activeTab, setActiveTab] = useState<'logs' | 'qr'>('logs');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDataUpdate = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleSearch = (filters: any) => {
    console.log('Search filters:', filters);
  };

  const visitorData: VisitorLog[] = [
    {
      id: '1',
      visitorName: 'Murugan',
      phoneNumber: '9876543210',
      companyOrHost: 'Tech Corp',
      purpose: 'Business Meeting',
      inTime: new Date().toISOString(),
      outTime: null,
    },
    {
      id: '2',
      visitorName: 'Muthu',
      phoneNumber: '9123456780',
      companyOrHost: 'Global Soft',
      purpose: 'Interview',
      inTime: new Date(Date.now() - 3600000).toISOString(),
      outTime: null,
    },
    {
      id: '3',
      visitorName: 'Kumar',
      phoneNumber: '9988776655',
      companyOrHost: 'Fin Solutions',
      purpose: 'Delivery',
      inTime: new Date(Date.now() - 7200000).toISOString(),
      outTime: new Date().toISOString(),
    },
    {
      id: '4',
      visitorName: 'Raja',
      phoneNumber: '9112233445',
      companyOrHost: 'Design Studio',
      purpose: 'Project Discussion',
      inTime: new Date().toISOString(),
      outTime: null,
    },
    {
      id: '5',
      visitorName: 'Sakthivel',
      phoneNumber: '9445566778',
      companyOrHost: 'Build It Inc',
      purpose: 'Site Visit',
      inTime: new Date(Date.now() - 1800000).toISOString(),
      outTime: null,
    },
    {
      id: '6',
      visitorName: 'Tharun',
      phoneNumber: '9334455667',
      companyOrHost: 'Sys Admin',
      purpose: 'Maintenance',
      inTime: new Date(Date.now() - 5400000).toISOString(),
      outTime: new Date().toISOString(),
    },
    {
      id: '7',
      visitorName: 'Gokul',
      phoneNumber: '9556677889',
      companyOrHost: 'Marketing Hub',
      purpose: 'Sales Pitch',
      inTime: new Date().toISOString(),
      outTime: null,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg shadow-sm">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Visitor Management</h1>
            <p className="text-sm text-slate-500">Register guests, track entries, and generate passes.</p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          System Active
        </div>
      </div>

      <div className="flex bg-slate-100 p-1 rounded-lg w-fit border border-slate-200/60">
        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === 'logs'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Users className="w-4 h-4" />
          Access Logs
        </button>
        <button
          onClick={() => setActiveTab('qr')}
          className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === 'qr'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <QrCode className="w-4 h-4" />
          Generate Entry QR
        </button>
      </div>

      {activeTab === 'qr' ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
           <div className="mb-6 border-b border-slate-100 pb-4">
             <h3 className="text-lg font-bold text-slate-800">Static Entry Point QR</h3>
             <p className="text-sm text-slate-500 mt-1">
               Generate a permanent QR code for your reception or gate. Print this and place it at the entry point for visitors to scan.
             </p>
           </div>
           <VisitorQr />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-2 mb-4 text-slate-700 font-semibold">
                <Search className="w-5 h-5 text-blue-500" />
                <span>Search Database</span>
              </div>
              <VisitorSearch onSearch={handleSearch} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Today's Activity Log
                </h3>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  Live Updates
                </span>
              </div>
              <div className="p-0">
                <VisitorTable key={refreshKey} data={visitorData} />
              </div>
            </div>

          </div> {/* Missing closing tag for grid container */}
        </div> 
      )}
    </div>
  );
}