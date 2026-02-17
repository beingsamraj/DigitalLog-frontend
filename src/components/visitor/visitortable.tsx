'use client';

import React from 'react';
import { User, Phone, Clock, CheckCircle, Building2 } from 'lucide-react';

// Define the structure of a Visitor Log
export interface VisitorLog {
  id: string;
  visitorName: string;
  phoneNumber: string;
  companyOrHost: string;
  purpose: string;
  vehicleNumber?: string;
  inTime: string;
  outTime: string | null;
}

interface VisitorTableProps {
  data: VisitorLog[];
  isLoading?: boolean;
  // Removed onCheckOut and onDelete from props as per request
}

export default function VisitorTable({ data, isLoading = false }: VisitorTableProps) {
  
  // Helper to format dates nicely
  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  // MOCK DATA - Used if props.data is empty (for standalone preview)
  const mockData: VisitorLog[] = [
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
      vehicleNumber: 'TN-10-AB-1234',
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

  // Use mockData if data prop is not provided, otherwise use prop data
  const tableData = data && data.length > 0 ? data : mockData;

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-3 p-4">
        <div className="h-12 bg-gray-200 rounded w-full"></div>
        <div className="h-12 bg-gray-200 rounded w-full"></div>
        <div className="h-12 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Visitor Details
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Visit Info
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              In Time
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Out Time
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            {/* ACTIONS COLUMN REMOVED */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((log) => (
            <tr key={log.id} className="hover:bg-blue-50/50 transition-colors">
              
              {/* Visitor Info Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                    {log.visitorName.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{log.visitorName}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {log.phoneNumber}
                    </div>
                  </div>
                </div>
              </td>

              {/* Visit Info (Purpose & Host) */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 font-medium">{log.purpose}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3 h-3" /> {log.companyOrHost || 'N/A'}
                </div>
                {log.vehicleNumber && (
                  <div className="text-[10px] text-gray-400 mt-0.5 bg-gray-100 inline-block px-1 rounded">
                    Veh: {log.vehicleNumber}
                  </div>
                )}
              </td>

              {/* In Time Column */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDateTime(log.inTime)}
                </div>
              </td>

              {/* Out Time Column */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {log.outTime ? (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDateTime(log.outTime)}
                  </div>
                ) : (
                  <span className="text-gray-300 italic">—</span>
                )}
              </td>

              {/* Status Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                {log.outTime ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                    <CheckCircle className="w-3 h-3" /> Checked Out
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 animate-pulse">
                    On Site
                  </span>
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}