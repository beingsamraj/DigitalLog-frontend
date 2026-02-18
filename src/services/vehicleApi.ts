const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// -------------------------------
// Vehicle API
// -------------------------------

export interface Vehicle {
  id: number;
  vehicle_number: string;
  driver_name: string;
  contact_number: string;
  factory_id?: number; // optional if vehicles are linked to factories
}

// Get all vehicles (optionally by factory)
export async function getAllVehicles(factoryId?: number): Promise<Vehicle[]> {
  const url = factoryId
    ? `${BASE_URL}/vehicles?factory_id=${factoryId}`
    : `${BASE_URL}/vehicles`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch vehicles");
  return res.json();
}

// Get vehicle by ID
export async function getVehicleById(id: number): Promise<Vehicle> {
  const res = await fetch(`${BASE_URL}/vehicles/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch vehicle with id ${id}`);
  return res.json();
}
