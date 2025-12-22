import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const linkStyle = {
    display: "block",
    padding: "10px 12px",
    color: "#e2e8f0",
    textDecoration: "none",
    borderRadius: "6px",
    marginBottom: "6px",
  };

  const activeStyle = {
    background: "#1f2937",
    color: "#fff",
  };

  return (
    <aside style={{ width: 240, height: "100vh", background: "#0f172a", padding: 20, color: "white" }}>
      <h2 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>Admin</h2>
      <nav>
        <NavLink to="/admin-dashboard" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/clients" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Client Details
        </NavLink>

        <NavLink to="/admin/clients/add" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Add New Client
        </NavLink>

        <NavLink to="/admin/clients/accesses" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Client accesses
        </NavLink>

        <NavLink to="/logout" style={linkStyle}>
          Logout
        </NavLink>
      </nav>
    </aside>
  );
}
