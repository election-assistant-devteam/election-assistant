import { useEffect, useState } from "react";

export const API_BASE = import.meta.env.VITE_API_BASE_URL;

const access_token = sessionStorage.getItem("access-token");

interface APIOptions {
  method: string;
  url: string | null;
  data?: any;
  addAuth: boolean;
}

export const useAPI = <T = any>({ method = "GET", url, data, addAuth }: APIOptions) => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>();

  const execute = async () => {
    setLoading(true);
    setError(null);

    const rawResponse: any = await fetch(`${API_BASE}${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(addAuth && { Authorization: `Bearer ${access_token}` }),
      },
      ...(data && { body: JSON.stringify(data) }),
    });

    const res = await rawResponse.json();

    switch (res.code) {
      case 20000:
        setResponse(res.data);
        setLoading(false);
        break;
      default:
        setError(res.message);
        setLoading(false);
        break;
    }
  };

  useEffect(() => {
    if (url) {
      execute();
    }
  }, [url, method]);

  return { response, error, loading };
};
