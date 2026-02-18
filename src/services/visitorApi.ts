const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// -------------------------------
// Visitor API
// -------------------------------

export interface Visitor {
  id: number;
  name: string;
  phone: string;
  purpose: string;
  factory_id?: number;
  check_in_time?: string;
  check_out_time?: string;
}

// Get all visitors (optionally filter by factory or date range)
export async function getAllVisitors(options?: {
  factory_id?: number;
  start_date?: string; // format: YYYY-MM-DD
  end_date?: string;   // format: YYYY-MM-DD
}): Promise<Visitor[]> {
  let queryParams = "";
  if (options) {
    const params = new URLSearchParams();
    if (options.factory_id) params.append("factory_id", options.factory_id.toString());
    if (options.start_date) params.append("start_date", options.start_date);
    if (options.end_date) params.append("end_date", options.end_date);
    queryParams = `?${params.toString()}`;
  }

  const res = await fetch(`${BASE_URL}/visitors${queryParams}`);
  if (!res.ok) throw new Error("Failed to fetch visitors");
  return res.json();
}

// Get visitor by ID
export async function getVisitorById(id: number): Promise<Visitor> {
  const res = await fetch(`${BASE_URL}/visitors/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch visitor with id ${id}`);
  return res.json();
}
