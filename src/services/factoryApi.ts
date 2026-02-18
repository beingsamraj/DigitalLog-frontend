const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// -------------------------------
// Factory API
// -------------------------------

export interface Factory {
  id: number;
  factory_name: string;
  address: string;
  contact_number: string;
}

// Create a new factory
export async function createFactory(data: {
  factory_name: string;
  address: string;
  contact_number: string;
}): Promise<Factory> {
  const res = await fetch(`${BASE_URL}/factories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create factory");
  return res.json();
}

// Get all factories
export async function getAllFactories(): Promise<Factory[]> {
  const res = await fetch(`${BASE_URL}/factories`);
  if (!res.ok) throw new Error("Failed to fetch factories");
  return res.json();
}

// Get factory by ID
export async function getFactoryById(id: number): Promise<Factory> {
  const res = await fetch(`${BASE_URL}/factories/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch factory with id ${id}`);
  return res.json();
}

// Update a factory
export async function updateFactory(
  id: number,
  data: {
    factory_name?: string;
    address?: string;
    contact_number?: string;
  }
): Promise<Factory> {
  const res = await fetch(`${BASE_URL}/factories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`Failed to update factory with id ${id}`);
  return res.json();
}

// Delete a factory
export async function deleteFactory(id: number): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/factories/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error(`Failed to delete factory with id ${id}`);
  return true;
}
