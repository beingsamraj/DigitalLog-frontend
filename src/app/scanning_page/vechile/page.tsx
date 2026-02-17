'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Truck, User, Phone, Package, ArrowUpDown, Building2, ShieldCheck, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

// Import your API helper. Adjust the path based on your project structure.
// import { vehicleApi } from '@/lib/api/vehicleApi'; 

interface VehicleFormData {
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  transporterName: string;
  purpose: 'inbound' | 'outbound' | 'return' | 'other';
  materialType: string;
}

export default function VehicleScanPage() {
  const searchParams = useSearchParams();
  const factoryId = searchParams.get('factory_id');

  const [formData, setFormData] = useState<VehicleFormData>({
    vehicleNumber: '',
    driverName: '',
    driverPhone: '',
    transporterName: '',
    purpose: 'inbound',
    materialType: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Redirect or show error if factory_id is missing
  useEffect(() => {
    if (!factoryId) {
      setStatus('error');
      setErrorMessage('Invalid QR Code: Missing Factory ID.');
    }
  }, [factoryId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-uppercase vehicle number for consistency
    const processedValue = name === 'vehicleNumber' ? value.toUpperCase() : value;

    setFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!factoryId) return;

    // Basic Validation
    if (!formData.vehicleNumber || !formData.driverName || !formData.materialType) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setStatus('idle');

    try {
      // --- API CALL PLACEHOLDER ---
      // Replace this mock setTimeout with your actual API call
      // await vehicleApi.createVehicleEntry({
      //   factoryId,
      //   ...formData,
      //   inTime: new Date().toISOString(),
      // });

      console.log('Submitting Vehicle Data:', { factoryId, ...formData });

      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success Handling
      setStatus('success');
      // Keep vehicle number for convenience, reset others
      setFormData((prev) => ({ 
        ...prev, 
        driverName: '', 
        driverPhone: '', 
        materialType: '' 
      })); 
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Failed to register vehicle. Please contact security.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render Invalid State
  if (!factoryId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Invalid Access Link</h2>
          <p className="text-slate-500 text-sm">
            This QR code is missing required identification parameters. Please contact the gate security.
          </p>
        </div>
      </div>
    );
  }

  // Render Success State
  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Entry Registered!</h2>
          <p className="text-slate-500 mb-6">
            Vehicle <span className="font-semibold text-slate-800">{formData.vehicleNumber}</span> is now checked in.
          </p>
          <p className="text-sm text-slate-400 mb-8">
            Please proceed to the weighing bridge or designated parking area.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="w-full bg-slate-900 text-white font-medium py-3 px-4 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Register Another Vehicle
          </button>
        </div>
      </div>
    );
  }

  // Render Form State
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 flex flex-col items-center">
      {/* Header / Branding Area */}
      <div className="w-full max-w-md mb-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-xl mb-4 shadow-lg shadow-indigo-200">
          <Truck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Vehicle Gate Entry</h1>
        <p className="text-slate-500 mt-2 text-sm">
          Register vehicle and driver details for factory access.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-mono text-slate-500">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Gate ID: {factoryId}
        </div>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 sm:p-8">
          
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Vehicle Number */}
            <div>
              <label htmlFor="vehicleNumber" className="block text-sm font-medium text-slate-700 mb-1.5">
                Vehicle Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Truck className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="vehicleNumber"
                  name="vehicleNumber"
                  required
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder-slate-400 uppercase"
                  placeholder="e.g. TN 07 AB 1234"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Purpose of Entry */}
            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-slate-700 mb-1.5">
                Purpose
              </label>
              <div className="relative">
                <ArrowUpDown className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <select
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 appearance-none cursor-pointer disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <option value="inbound">Inbound (Material In)</option>
                  <option value="outbound">Outbound (Delivery Out)</option>
                  <option value="return">Return Empty</option>
                  <option value="other">Other</option>
                </select>
                 <div className="absolute right-3 top-3 pointer-events-none text-slate-400">
                   <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            {/* Material Type */}
            <div>
              <label htmlFor="materialType" className="block text-sm font-medium text-slate-700 mb-1.5">
                Material Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="materialType"
                  name="materialType"
                  required
                  value={formData.materialType}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                  placeholder="e.g. Raw Steel, Finished Goods"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Driver Name */}
            <div>
              <label htmlFor="driverName" className="block text-sm font-medium text-slate-700 mb-1.5">
                Driver Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="driverName"
                  name="driverName"
                  required
                  value={formData.driverName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                  placeholder="e.g. Rajesh Kumar"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Driver Phone */}
            <div>
              <label htmlFor="driverPhone" className="block text-sm font-medium text-slate-700 mb-1.5">
                Driver Contact
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  id="driverPhone"
                  name="driverPhone"
                  pattern="[0-9]{10}"
                  value={formData.driverPhone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                  placeholder="e.g. 9876543210"
                  disabled={isSubmitting}
                />
              </div>
            </div>

             {/* Transporter / Company Name */}
             <div>
              <label htmlFor="transporterName" className="block text-sm font-medium text-slate-700 mb-1.5">
                Transporter / Logistics Co.
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="transporterName"
                  name="transporterName"
                  value={formData.transporterName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                  placeholder="e.g. FastTrack Logistics"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Registering Entry...
                </>
              ) : (
                'Check In Vehicle'
              )}
            </button>
          </form>
        </div>
        
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            Drivers must carry valid ID and license. Speed limit inside premises is 10 km/h.
          </p>
        </div>
      </div>
    </div>
  );
}