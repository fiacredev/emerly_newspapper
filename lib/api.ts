const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function getToken() {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("newsroom_token");
}

export function saveToken(token: string) {
  localStorage.setItem("newsroom_token", token);
}

export function removeToken() {
  localStorage.removeItem("newsroom_token");
}

interface ApiOptions extends RequestInit {
  auth?: boolean;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const { auth = false, headers, ...rest } = options;

  const token = getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(auth && token
        ? { Authorization: `Bearer ${token}` }
        : {}),
      ...headers,
    },
    cache: "no-store",
  });

 const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message ||
      `Request failed with status ${response.status}`
    );
  }

  if (!result) {
    throw new Error("The server returned an invalid response");
  }

  return result as T;
}