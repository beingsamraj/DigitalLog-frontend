'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { User, Phone, Briefcase, Building2, ShieldCheck, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

// Import your API helper. Adjust the path based on your project structure.
// import { visitorApi } from '@/lib/api/visitorApi'; 

interface FormData {
  visitorName: string;
  phoneNumber: string;
  purpose: string;
  hostName: string;
}

export default function VisitorScanPage() {
  const searchParams = useSearchParams();
  const factoryId = searchParams.get('factory_id');

  const [formData, setFormData] = useState<FormData>({
    visitorName: '',
    phoneNumber: '',
    purpose: '',
    hostName: '',
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!factoryId) return;

    // Basic Validation
    if (!formData.visitorName || !formData.phoneNumber || !formData.purpose) {
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
      // await visitorApi.createVisitor({
      //   factoryId,
      //   ...formData,
      //   inTime: new Date().toISOString(),
      // });

      console.log('Submitting Visitor Data:', { factoryId, ...formData });

      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success Handling
      setStatus('success');
      setFormData({ visitorName: '', phoneNumber: '', purpose: '', hostName: '' }); // Reset form
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Failed to check in. Please try again or contact security.');
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
            This QR code is missing required identification parameters. Please contact the front desk.
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
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Check-in Successful!</h2>
          <p className="text-slate-500 mb-8">
            Welcome, {formData.visitorName || 'Guest'}. Your entry has been registered with the security team.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="w-full bg-slate-900 text-white font-medium py-3 px-4 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Register Another Visitor
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
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-xl mb-4 shadow-lg shadow-blue-200">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Visitor Entry</h1>
        <p className="text-slate-500 mt-2 text-sm">
          Please provide your details to check in at the facility.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-mono text-slate-500">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Location ID: {factoryId}
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
            
            {/* Visitor Name */}
            <div>
              <label htmlFor="visitorName" className="block text-sm font-medium text-slate-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="visitorName"
                  name="visitorName"
                  required
                  value={formData.visitorName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                  placeholder="e.g. John Doe"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-700 mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  pattern="[0-9]{10}" // Example pattern for 10 digits
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                  placeholder="e.g. 9876543210"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Purpose of Visit */}
            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-slate-700 mb-1.5">
                Purpose <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <select
                  id="purpose"
                  name="purpose"
                  required
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 appearance-none cursor-pointer disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <option value="" disabled>Select purpose...</option>
                  <option value="Business Meeting">Business Meeting</option>
                  <option value="Interview">Interview</option>
                  <option value="Delivery">Delivery / Pickup</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Personal">Personal Visit</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute right-3 top-3 pointer-events-none text-slate-400">
                   {/* Custom Chevron SVG could go here */}
                   <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            {/* Host / Whom to meet */}
            <div>
              <label htmlFor="hostName" className="block text-sm font-medium text-slate-700 mb-1.5">
                Whom to meet? (Person/Dept)
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="hostName"
                  name="hostName"
                  value={formData.hostName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                  placeholder="e.g. Mr. Sharma / HR Dept"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                'Check In'
              )}
            </button>
          </form>
        </div>
        
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            By checking in, you agree to adhere to the facility's safety and security protocols.
          </p>
        </div>
      </div>
    </div>
  );
}