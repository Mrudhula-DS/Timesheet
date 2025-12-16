import { useState } from "react";
import authApi from "../api/authApi";
import "../styles/login.css";

export default function Login() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!employeeId || !password) {
      setError("Employee ID and Password are required");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Login
      const data = await authApi.login(employeeId, password);

      // 2️⃣ Save JWT
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // 3️⃣ Get user profile (role)
      const profile = await authApi.profile();
      localStorage.setItem("role", profile.role);

      // 4️⃣ Redirect to OTHER APP
      if (profile.role === "client") {
        window.location.href = "http://localhost:5174/";
      } else if (profile.role === "admin") {
        window.location.href = "/admin";
      } else {
        setError("Unknown role");
      }

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
