"use client";

import { useState } from "react";
import { createFactoryQR } from "@/services/factoryQrApi";

interface Props {
  refresh: () => void; // Function to refresh the table after adding QR
}

export default function FactoryQrCrudSection({ refresh }: Props) {
  const [qrName, setQrName] = useState("");
  const [factoryId, setFactoryId] = useState<number>(1); // Default to 1, or make this an input
  const [qrType, setQrType] = useState<string>("ENTRY"); // Default type

  const handleCreate = async () => {
    if (!qrName.trim() || !factoryId) {
      alert("Please enter a QR Name and Factory ID");
      return;
    }

    try {
      // Generate a simple unique ID (e.g., "AB12XY")
      const uniqueId = Math.random().toString(36).substring(2, 8).toUpperCase();

      await createFactoryQR({
        factory_id: factoryId,
        qr_unique_id: uniqueId,
        qr_name: qrName,
        qr_type: qrType,
        is_active: true,
      });
      
      // Reset form
      setQrName("");
      refresh(); // Refresh the table
    } catch (error) {
      console.error("Failed to create QR:", error);
      alert("Error creating QR");
    }
  };

  return (
    <div className="p-4 border rounded mb-4 shadow-sm bg-white">
      <h2 className="font-bold mb-4 text-lg text-gray-800">Add Factory QR</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
        
        {/* Factory ID Input */}
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">FACTORY ID</label>
          <input
            type="number"
            placeholder="1"
            value={factoryId}
            onChange={(e) => setFactoryId(Number(e.target.value))}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* QR Name Input */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-500 mb-1">QR NAME</label>
          <input
            type="text"
            placeholder="e.g. Main Gate Scanner"
            value={qrName}
            onChange={(e) => setQrName(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* QR Type Select */}
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">TYPE</label>
          <select 
            value={qrType}
            onChange={(e) => setQrType(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="ENTRY">Entry</option>
            <option value="EXIT">Exit</option>
            <option value="ASSET">Asset</option>
          </select>
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
        >
          Create QR
        </button>
      </div>
    </div>
  );
}