"use client";

import React, { useState } from "react";

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

    // 🔹 Later replace this with API call
    // await fetch("/api/factories", { method: "POST", body: JSON.stringify(formData) })

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
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">
        Add / Update Factory
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Factory Code */}
        <input
          name="factory_code"
          placeholder="Factory Code *"
          value={formData.factory_code}
          onChange={handleChange}
          className="input"
          required
        />

        {/* Factory Name */}
        <input
          name="factory_name"
          placeholder="Factory Name *"
          value={formData.factory_name}
          onChange={handleChange}
          className="input"
          required
        />

        {/* Location */}
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="input"
        />

        {/* Status */}
        <select
          name="is_active"
          value={formData.is_active.toString()}
          onChange={handleChange}
          className="input"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        {/* Factory Address */}
        <textarea
          name="factory_address"
          placeholder="Factory Address"
          value={formData.factory_address}
          onChange={handleChange}
          className="input col-span-1 md:col-span-2"
        />

        {/* Buttons */}
        <div className="col-span-1 md:col-span-2 flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Factory
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
