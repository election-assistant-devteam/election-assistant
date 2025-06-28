export const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function apiCall(path: string, method: string, data?, extra?: boolean) {
  const access_token = sessionStorage.getItem("access-token");
  const response = await fetch(`${API_BASE}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(extra && { Authorization: `Bearer ${access_token}` }),
    },
    ...(data && { body: JSON.stringify(data) }),
  });

  return response.json();
}
