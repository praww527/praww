const BASE = process.env.REACT_APP_BACKEND_URL + "/api";

export function getToken() {
  return localStorage.getItem("praww_token");
}

export function setToken(token) {
  if (token) localStorage.setItem("praww_token", token);
  else localStorage.removeItem("praww_token");
}

export async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    ...options,
    headers,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || err.message || "Request failed");
  }
  if (res.status === 204) return null;
  return res.json();
}
