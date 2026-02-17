"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function FactoryCrudSection() {
  const [formData, setFormData] = useState({
    factory_code: "",
    factory_name: "",
    location: "",
    factory_address: "",
    is_active: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "is_active") {
      setFormData({ ...formData, is_active: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Factory Data (DB Ready):", formData);
    alert("Factory Submitted (Frontend Only)");
  };

  const handleClear = () => {
    setFormData({
      factory_code: "",
      factory_name: "",
      location: "",
      factory_address: "",
      is_active: true,
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Add / Update Factory
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Factory Code */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Factory Code <span className="text-red-500">*</span>
          </label>
          <input
            name="factory_code"
            placeholder="Enter Factory Code"
            value={formData.factory_code}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            required
          />
        </div>

        {/* Factory Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Factory Name <span className="text-red-500">*</span>
          </label>
          <input
            name="factory_name"
            placeholder="Enter Factory Name"
            value={formData.factory_name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            required
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            name="location"
            placeholder="City / Area"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>

        {/* Status Toggle */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, is_active: true })}
              className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm border transition ${
                formData.is_active
                  ? "bg-green-100 text-green-800 border-green-300"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <CheckCircle className="w-4 h-4 inline mr-1" /> Active
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, is_active: false })}
              className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm border transition ${
                !formData.is_active
                  ? "bg-red-100 text-red-800 border-red-300"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <XCircle className="w-4 h-4 inline mr-1" /> Inactive
            </button>
          </div>
        </div>

        {/* Factory Address */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Factory Address
          </label>
          <textarea
            name="factory_address"
            placeholder="Full address of the factory"
            value={formData.factory_address}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
            rows={3}
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Save Factory
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
