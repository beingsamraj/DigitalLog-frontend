'use client';

import { useState } from 'react';
import { Car, PlusCircle, Search, QrCode } from 'lucide-react';

// Active Imports
import VehicleSearch from '@/components/vechile/vechilesearch';
import VehicleTable, { VehicleLog } from '@/components/vechile/vechiletable'; // Importing the type as well
import VehicleQr from '@/components/vechile/vechileqr';

export default function VehiclePage() {
  const [activeTab, setActiveTab] = useState<'log' | 'qr'>('log');
  const [refreshKey, setRefreshKey] = useState(0);

  // FIX 1: Create a handler for the Search component
  const handleSearch = (filters: any) => {
    console.log('Search filters:', filters);
    // Later: This will call the API to filter data
  };

  // FIX 2: Create dummy data for the Table component
  const dummyData: VehicleLog[] = [
    {
      id: '1',
      vehicleNumber: 'KL-01-AB-1234',
      ownerName: 'John Doe',
      vehicleType: 'Car',
      purpose: 'Meeting',
      inTime: new Date().toISOString(),
      outTime: null,
    },
    {
      id: '2',
      vehicleNumber: 'TN-07-CD-5678',
      ownerName: 'Jane Smith',
      vehicleType: 'Van',
      purpose: 'Delivery',
      inTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      outTime: new Date().toISOString(),
    },
  ];

  // Function to trigger table refresh after adding/editing data
  const handleDataUpdate = () => {
    setRefreshKey((prev) => prev + 1);
    if (activeTab === 'qr') setActiveTab('log');
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 text-green-700 rounded-lg shadow-sm">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Vehicle Management</h1>
            <p className="text-sm text-slate-500">Log entries, generate QR passes, and view daily records.</p>
          </div>
        </div>

        {/* PROFESSIONAL TAB SWITCHER */}
        <div className="flex bg-slate-100 p-1 rounded-lg w-fit border border-slate-200/60 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('log')}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'log'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
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
      </div>

      {/* Conditional Rendering based on Tab */}
      {activeTab === 'qr' ? (
        // QR Generator Container
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <div className="mb-6 border-b border-slate-100 pb-4">
             <h3 className="text-lg font-bold text-slate-800">Static Gate Entry QR</h3>
             <p className="text-sm text-slate-500 mt-1">
               Generate a permanent QR code for your factory gate. Print this and place it at the entry point.
             </p>
           </div>
           <VehicleQr />
        </div>
      ) : (
        // Main Log View: Form + Search + Table
        <div className="space-y-6">
          
          {/* Top Section: Search Component and Form Component */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Search Component (Takes up 2 columns) */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-2 mb-4 text-slate-700 font-semibold">
                <Search className="w-5 h-5 text-green-600" />
                <span>Search Database</span>
              </div>
              
              {/* FIX: Passing the onSearch prop */}
              <VehicleSearch onSearch={handleSearch} />
            </div>
          </div>

          {/* Bottom Section: Data Table Component */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Today's Activity Log
              </h3>
              {/* Small visual indicator for 'Live' table */}
              <span className="text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                Live Updates
              </span>
            </div>
            
            {/* FIX: Passing the data prop */}
            <VehicleTable key={refreshKey} data={dummyData} />
          </div>

        </div>
      )}

    </div>
  );
}