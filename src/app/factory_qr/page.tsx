
"use client";
import FactoryQrCrudSection from "@/components/factory_qr/factoryqrcrudsection";
import FactoryQrTable from "@/components/factory_qr/factoryqrtable";
import { useState } from "react";

export default function FactoryQrPage() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refresh = () => setRefreshFlag(!refreshFlag);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Factory QR Management</h1>
      <FactoryQrCrudSection refresh={refresh} />
      <FactoryQrTable key={refreshFlag ? 1 : 0} />
    </div>
  );
}
