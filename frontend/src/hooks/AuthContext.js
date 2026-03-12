import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { apiFetch, setToken } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading, null = not logged in
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const u = await apiFetch("/api/auth/user");
      setUser(u);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  const login = async (email, password) => {
    const res = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    // res contains { token, ...user }
    29 setToken(res.token);

30 const userData = {
31   id: res.id,
32   email: res.email,
33   first_name: res.first_name,
34   last_name: res.last_name
35 };

36 setUser(userData);
37 return userData;
  };

  const register = async (email, password, firstName, lastName) => {
  const res = await apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName
    }),
  });

  setToken(res.token);

  const userData = {
    id: res.id,
    email: res.email,
    first_name: res.first_name,
    last_name: res.last_name
  };

  setUser(userData);
  return userData;
  };

  const refreshUser = fetchUser;

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
