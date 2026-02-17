// src/app/factory/page.tsx

import FactoryCrudSection from "@/components/factory/factorycrudsection";
import FactoryTable from "@/components/factory/factorytable";

export default function FactoryPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Factory Management</h1>
        <p className="text-gray-500 text-sm">
          Manage and maintain factory details
        </p>
      </div>

      {/* CRUD Section */}
      <FactoryCrudSection />

      {/* Table Section */}
      <FactoryTable />
    </div>
  );
}
