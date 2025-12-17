import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import "../styles/login.css";

export default function Login() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const roleRedirectMap = {
    admin: "/admin-dashboard",
    manager: "/manager-dashboard",
    employee: "/employee-dashboard",
    client_admin: "/client-dashboard",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!employeeId || !password) {
      setError("Employee ID and Password are required");
      return;
    }

    try {
      setLoading(true);

      // Login
      const data = await authApi.login(employeeId, password);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // Profile
      const profile = await authApi.profile();
      localStorage.setItem("role", profile.role);

      const redirectPath = roleRedirectMap[profile.role];

      if (!redirectPath) {
        setError(`Unknown role: ${profile.role}`);
        return;
      }

      navigate(redirectPath, { replace: true });

    } catch (err) {
      setError("Invalid Employee ID or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2>Timesheet Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
}
