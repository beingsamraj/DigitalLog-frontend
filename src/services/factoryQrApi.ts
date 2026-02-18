const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// -------------------------------
// Factory QR API
// -------------------------------

export interface FactoryQR {
  id: number;
  factory_id: number;
  qr_unique_id: string;
  qr_name: string;
  qr_type: string;
  is_active: boolean;
}

// Create a new QR code
export async function createFactoryQR(data: {
  factory_id: number;
  qr_unique_id: string;
  qr_name: string;
  qr_type: string;
  is_active?: boolean;
}): Promise<FactoryQR> {
  // UPDATED: Corrected endpoint to match backend route (/factory-qr)
  const res = await fetch(`${BASE_URL}/factory-qr/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create QR code");
  return res.json();
}

// Get all QR codes (optionally by factory)
export async function getAllFactoryQRs(factory_id?: number): Promise<FactoryQR[]> {
  // UPDATED: Corrected endpoint
  const url = factory_id
    ? `${BASE_URL}/factory-qr/?factory_id=${factory_id}`
    : `${BASE_URL}/factory-qr/`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch QR codes");
  return res.json();
}

// Get QR by ID
export async function getFactoryQRById(id: number): Promise<FactoryQR> {
  // UPDATED: Corrected endpoint
  const res = await fetch(`${BASE_URL}/factory-qr/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch QR code with id ${id}`);
  return res.json();
}

// Update QR code
export async function updateFactoryQR(
  id: number,
  data: Partial<{
    factory_id: number;
    qr_unique_id: string;
    qr_name: string;
    qr_type: string;
    is_active: boolean;
  }>
): Promise<FactoryQR> {
  // UPDATED: Corrected endpoint
  const res = await fetch(`${BASE_URL}/factory-qr/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`Failed to update QR code with id ${id}`);
  return res.json();
}

// Delete QR code
export async function deleteFactoryQR(id: number): Promise<boolean> {
  // UPDATED: Corrected endpoint
  const res = await fetch(`${BASE_URL}/factory-qr/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error(`Failed to delete QR code with id ${id}`);
  return true;
}