"use client";

import React from "react";
import { Building2, MapPin, CheckCircle, XCircle, Hash } from "lucide-react";

export interface Factory {
  factory_code: string;
  factory_name: string;
  location?: string;
  factory_address?: string;
  is_active: boolean;
  created_at?: string;
}

interface FactoryTableProps {
  data: Factory[];
  isLoading?: boolean;
}

export default function FactoryTable({
  data,
  isLoading = false,
}: FactoryTableProps) {
  
  // Mock Data (for preview)
  const mockData: Factory[] = [
    {
      factory_code: "FAC001",
      factory_name: "ABC Manufacturing",
      location: "Chennai",
      factory_address: "SIPCOT Industrial Area",
      is_active: true,
      created_at: new Date().toISOString(),
    },
    {
      factory_code: "FAC002",
      factory_name: "XYZ Industries",
      location: "Bangalore",
      factory_address: "Electronic City Phase 1",
      is_active: false,
      created_at: new Date().toISOString(),
    },
  ];

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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Factory Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location Info
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Factory Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((factory) => (
            <tr
              key={factory.factory_code}
              className="hover:bg-blue-50/50 transition-colors"
            >
              
              {/* Factory Info Column (Avatar Style like Visitor) */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                    {factory.factory_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {factory.factory_name}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {factory.factory_address || "No address"}
                    </div>
                  </div>
                </div>
              </td>

              {/* Location Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {factory.location || "N/A"}
                </div>
              </td>

              {/* Factory Code Column */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Hash className="w-3 h-3" />
                  {factory.factory_code}
                </div>
              </td>

              {/* Status Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                {factory.is_active ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                    <CheckCircle className="w-3 h-3" />
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
                    <XCircle className="w-3 h-3" />
                    Inactive
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
