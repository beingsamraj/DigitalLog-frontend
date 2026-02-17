'use client';

import React from 'react';
import { Clock, LogOut, Trash2, Car as CarIcon, CheckCircle } from 'lucide-react';

// Define the structure of a Vehicle Log
export interface VehicleLog {
  id: string;
  vehicleNumber: string;
  ownerName: string;
  vehicleType: string;
  purpose: string;
  inTime: string;
  outTime: string | null;
}

interface VehicleTableProps {
  data: VehicleLog[];
  isLoading?: boolean;
  onCheckOut?: (id: string) => void; // Optional action handler
  onDelete?: (id: string) => void;    // Optional action handler
}

export default function VehicleTable({ data, isLoading = false, onCheckOut, onDelete }: VehicleTableProps) {
  
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

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-3 p-4">
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <CarIcon className="w-12 h-12 mb-3 opacity-50" />
        <p className="text-sm font-medium">No vehicle logs found.</p>
        <p className="text-xs">Try adjusting your search or check-in a new vehicle.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle Details
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Purpose
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
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50 transition-colors">
              
              {/* Vehicle Info Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CarIcon className="h-4 w-4" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{log.vehicleNumber}</div>
                    <div className="text-xs text-gray-500">{log.ownerName} • {log.vehicleType}</div>
                  </div>
                </div>
              </td>

              {/* Purpose Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-700">
                  {log.purpose}
                </span>
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
                    <CheckCircle className="w-3 h-3" /> Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 animate-pulse">
                    Active
                  </span>
                )}
              </td>

              {/* Actions Column */}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-3">
                  {!log.outTime && onCheckOut && (
                    <button
                      onClick={() => onCheckOut(log.id)}
                      className="text-green-600 hover:text-green-900 transition-colors"
                      title="Check Out"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(log.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                      title="Delete Log"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}