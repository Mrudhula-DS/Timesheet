// src/router.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import AdminDashboard from "./dashboard/AdminDashboard";
import ManagerDashboard from "./dashboard/ManagerDashboard";
import EmployeeDashboard from "./dashboard/EmployeeDashboard";
import ClientDashboard from "./dashboard/ClientDashboard";

import TimesheetList from "./pages/TimesheetList";
import TimesheetForm from "./pages/TimesheetForm";
import EmployeeList from "./pages/EmployeeList";

import CreateProject from "./modules/clients/CreateProject";
import AssignProject from "./modules/clients/AssignProject";
import ProjectList from "./modules/clients/ProjectList";
import ClientReports from "./modules/clients/ClientReports";

import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import RequireAuth from "./auth/RequireAuth";
import DashboardLayout from "./layout/DashboardLayout";
import { useAuth } from "./auth/AuthProvider";

export default function Router() {
  const { user, loading } = useAuth();

  if (loading) return null;

  const roleDashboard = {
    admin: "/admin-dashboard",
    manager: "/manager-dashboard",
    employee: "/employee-dashboard",
    client_admin: "/client-dashboard",
  };

  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= ROOT ================= */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={roleDashboard[user.role]} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* ================= ADMIN / MANAGER / EMPLOYEE ================= */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager-dashboard"
        element={
          <ProtectedRoute>
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee-dashboard"
        element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= CLIENT (LAYOUT BASED) ================= */}
      <Route
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/assign-project" element={<AssignProject />} />
        <Route path="/project-list" element={<ProjectList />} />
        <Route path="/reports" element={<ClientReports />} />
      </Route>

      {/* ================= 404 ================= */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
