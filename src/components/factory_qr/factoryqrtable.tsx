"use client";

import { useEffect, useState } from "react";
import { getAllFactoryQRs, deleteFactoryQR, FactoryQR } from "@/services/factoryQrApi";

export default function FactoryQrTable() {
  const [qrs, setQrs] = useState<FactoryQR[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQrs = async () => {
    try {
      setLoading(true);
      const data = await getAllFactoryQRs(); // Fixed: Correct function name
      setQrs(data);
    } catch (error) {
      console.error("Failed to fetch QRs:", error);
      alert("Error fetching QR codes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQrs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this QR?")) return;
    try {
      await deleteFactoryQR(id); // Fixed: Correct function name
      fetchQrs(); // Refresh the table
    } catch (error) {
      console.error("Failed to delete QR:", error);
      alert("Error deleting QR code");
    }
  };

  if (loading) return <p className="text-gray-500">Loading QR codes...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 rounded shadow-sm bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
            <th className="border p-3 text-left font-semibold">ID</th>
            <th className="border p-3 text-left font-semibold">QR Name</th>
            <th className="border p-3 text-left font-semibold">Unique ID</th>
            <th className="border p-3 text-left font-semibold">Type</th>
            <th className="border p-3 text-left font-semibold">Factory ID</th>
            <th className="border p-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {qrs.length === 0 ? (
            <tr>
              <td colSpan={6} className="border p-4 text-center text-gray-500">
                No QR codes found. Add one to get started.
              </td>
            </tr>
          ) : (
            qrs.map((qr) => (
              <tr key={qr.id} className="hover:bg-gray-50 transition-colors">
                <td className="border p-3 text-gray-700">{qr.id}</td>
                <td className="border p-3 font-medium text-gray-900">{qr.qr_name}</td>
                <td className="border p-3 font-mono text-cyan-600 text-sm">{qr.qr_unique_id}</td>
                <td className="border p-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    qr.qr_type === 'ENTRY' ? 'bg-green-100 text-green-800' :
                    qr.qr_type === 'EXIT' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {qr.qr_type}
                  </span>
                </td>
                <td className="border p-3 text-gray-600">{qr.factory_id}</td>
                <td className="border p-3">
                  <button
                    onClick={() => handleDelete(qr.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}