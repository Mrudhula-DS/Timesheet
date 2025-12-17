import { Outlet } from "react-router-dom";
import SidebarClient from "../components/Sidebar_client";
import "../styles/layout.css";
import "../styles/dashboard.css";

export default function DashboardLayout() {
  return (
    <div className="layout">
      <SidebarClient />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
