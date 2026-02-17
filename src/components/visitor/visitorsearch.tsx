'use client';

import React, { useState, useEffect } from 'react';
import { Search, Calendar, X, Phone } from 'lucide-react';

// Define the structure of the search filters
export interface VisitorSearchFilters {
  searchTerm: string;
  startDate: string;
  endDate: string;
}

interface VisitorSearchProps {
  onSearch: (filters: VisitorSearchFilters) => void;
}

export default function VisitorSearch({ onSearch }: VisitorSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Trigger the onSearch callback whenever filters change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch({
        searchTerm,
        startDate,
        endDate,
      });
    }, 300); // Debounce delay to prevent excessive API calls

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, startDate, endDate, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="space-y-3">
      {/* Search Bar: Name or Phone Number */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Name or Phone Number..."
          className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Date Range Filters */}
      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1 ml-1">
            From Date
          </label>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <Calendar className="h-3 w-3 text-gray-400" />
            </div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="pl-7 pr-2 py-1.5 w-full border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1 ml-1">
            To Date
          </label>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <Calendar className="h-3 w-3 text-gray-400" />
            </div>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="pl-7 pr-2 py-1.5 w-full border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Helper Text / Quick Filter Placeholder */}
      <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
        <span>Searches apply instantly</span>
        <div className="flex items-center gap-1">
          <Phone className="w-3 h-3" />
          <span>Phone lookup enabled</span>
        </div>
      </div>

      {/* Clear All Button */}
      {(searchTerm || startDate || endDate) && (
        <button
          onClick={handleClear}
          className="w-full text-xs text-gray-500 hover:text-red-600 py-1 border-t border-gray-100 mt-1 flex items-center justify-center gap-1"
        >
          <X className="w-3 h-3" /> Clear all filters
        </button>
      )}
    </div>
  );
}