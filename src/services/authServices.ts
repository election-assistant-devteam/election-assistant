export const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function apiCall(path: string, method: string, data?) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(data && { body: JSON.stringify(data) }),
  });

  return response.json();
}
