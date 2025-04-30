// const ENDPOINT = "http://13.124.154.53:80/api/auth/login";

export async function apiCall(data, endpoint, method) {
  const response = await fetch(endpoint, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
