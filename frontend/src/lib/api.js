const BASE = process.env.REACT_APP_BACKEND_URL || "";

export function getToken() {
  return localStorage.getItem("praww_token");
}

export function setToken(token) {
  if (token) {
    localStorage.setItem("praww_token", String(token));
  } else {
    localStorage.removeItem("praww_token");
  }
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
    ...options,
    headers,
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "{}");
let err = {};
try { err = JSON.parse(errText); } catch {}
throw new Error(String(err.detail || err.message || "Request failed"));
  }
  if (res.status === 204) return null;
  const data = await res.json();
  return data;
}
