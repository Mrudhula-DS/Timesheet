import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("access");

  if (!token) {
    // Use relative path
    return <Navigate to="/login" replace />;
  }

  return children;
}
