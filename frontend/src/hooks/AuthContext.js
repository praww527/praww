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
   setToken(res.token);
const { token, ...user } = res;
setUser(user);
return user;
  };

  const register = async (email, password, firstName, lastName) => {
    const res = await apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName }),
    });
    setToken(res.token);
    const { token: _, ...u } = res;
    setUser(u);
    return u;
  };

  const logout = async () => {
    await apiFetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setToken(null);
    setUser(null);
  };

  const refreshUser = fetchUser;

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
