// src/auth/AuthProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("access");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const profile = await authApi.profile();
        setUser(profile);
      } catch {
        localStorage.clear();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  async function login(username, password) {
    const data = await authApi.login(username, password);
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    const profile = await authApi.profile();
    setUser(profile);

    const roleRoutes = {
      admin: "/admin-dashboard",
      manager: "/manager-dashboard",
      employee: "/employee-dashboard",
      client_admin: "/client-dashboard",
    };

    navigate(roleRoutes[profile.role] || "/", { replace: true });
  }

  async function register(username, email, password) {
    await authApi.register(username, email, password);
    navigate("/login");
  }

  function logout() {
    localStorage.clear();
    setUser(null);
    navigate("/login", { replace: true });
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
