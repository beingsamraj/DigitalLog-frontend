import Link from "next/link";
import { Users, Car, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in-up">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Welcome back. Select a module to manage your logs.
        </p>
      </div>

      {/* Stats Overview (Static Placeholders for UI Demo) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Visitors</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Vehicles In</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <Car className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Actions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
            </div>
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Module Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Visitors Module Card */}
        <Link 
          href="/visitors"
          className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-400 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative flex flex-col items-center text-center z-10">
            <div className="mb-6 p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <Users className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
              Visitor Logs
            </h2>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Manage visitor entries, generate passes, and track check-in/out history efficiently.
            </p>
            <span className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
              Open Module <span className="ml-2">&rarr;</span>
            </span>
          </div>
        </Link>

        {/* Vehicles Module Card */}
        <Link 
          href="/vehicles"
          className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-green-400 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-green-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative flex flex-col items-center text-center z-10">
            <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
              <Car className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
              Vehicle Logs
            </h2>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Track vehicle movement, generate QR codes for entry, and maintain daily vehicle records.
            </p>
            <span className="inline-flex items-center text-sm font-semibold text-green-600 group-hover:translate-x-1 transition-transform">
              Open Module <span className="ml-2">&rarr;</span>
            </span>
          </div>
        </Link>

      </div>
    </div>
  );
}