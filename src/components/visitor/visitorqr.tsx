'use client';

import React, { useState, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Printer, MapPin, Download, Building2 } from 'lucide-react';

export default function VisitorQr() {
  // State for Factory/Entry Point Details
  const [entryDetails, setEntryDetails] = useState({
    entryName: 'Main Reception',
    entryId: 'VIS-ENTRY-01',
    location: 'Building A - Lobby',
  });

  // Generate the data string for the QR code
  // This JSON structure represents the FIXED entry point
  const qrData = useMemo(() => {
    return JSON.stringify({
      type: 'VISITOR_CHECKIN',
      entryId: entryDetails.entryId,
      location: entryDetails.location,
      timestamp: new Date().toISOString(), // Optional: Timestamp to help verify validity
    });
  }, [entryDetails]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const svg = document.getElementById('visitor-qr-svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${entryDetails.entryId}_visitor_qr.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* LEFT COLUMN: Configuration */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-fit">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Entry Point Configuration</h3>
        </div>
        
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Configure the details for this visitor entry point. The generated QR code is static and can be reused indefinitely for all visitors arriving at this specific location.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Entry Point ID
            </label>
            <input
              type="text"
              value={entryDetails.entryId}
              onChange={(e) => setEntryDetails({ ...entryDetails, entryId: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. VIS-ENTRY-01"
            />
            <p className="text-xs text-slate-400 mt-2">A unique identifier for this location (e.g., Gate A, Reception).</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Entry Name
            </label>
            <input
              type="text"
              value={entryDetails.entryName}
              onChange={(e) => setEntryDetails({ ...entryDetails, entryName: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Main Reception"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Location / Zone
            </label>
            <input
              type="text"
              value={entryDetails.location}
              onChange={(e) => setEntryDetails({ ...entryDetails, location: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Building A - Lobby"
            />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Preview Card (Printable) */}
      <div className="flex flex-col items-center">
        
        {/* The Card Itself */}
        <div 
          id="visitor-qr-printable-area"
          className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center text-center w-full max-w-sm relative overflow-hidden"
        >
          {/* Decorative Top Gradient */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-sky-400"></div>

          {/* Header Icon */}
          <div className="mt-2 mb-6">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-1">{entryDetails.entryName}</h2>
          <p className="text-sm text-slate-500 mb-8 font-medium">{entryDetails.location}</p>

          {/* QR Code Container */}
          <div className="p-6 bg-white rounded-2xl shadow-inner border-2 border-dashed border-blue-100 mb-8 relative group">
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <QRCodeSVG 
              id="visitor-qr-svg"
              value={qrData} 
              size={220}
              level={"H"}
              includeMargin={true}
              bgColor="#ffffff"
              fgColor="#0f172a" // Slate 900
              className="relative z-10"
            />
          </div>

          {/* Card Footer */}
          <div className="w-full border-t border-slate-100 pt-6">
            <p className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-widest">{entryDetails.entryId}</p>
            <p className="text-sm font-bold text-blue-600">
              Scan for Visitor Check-In
            </p>
          </div>
        </div>

        {/* Action Buttons (Hidden when printing) */}
        <div className="flex gap-4 mt-8 w-full max-w-sm no-print">
          <button 
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-3 px-4 rounded-xl text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
          <button 
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
          >
            <Download className="w-4 h-4" /> Download SVG
          </button>
        </div>

      </div>

    </div>
  );
}