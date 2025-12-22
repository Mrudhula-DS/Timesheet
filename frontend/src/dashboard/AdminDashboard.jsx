import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminDashboard() {
  const [clientsCount, setClientsCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    axiosClient
      .get("clients/")
      .then((res) => {
        if (!mounted) return;
        // Handle both list responses and paginated responses
        const data = res.data;
        if (Array.isArray(data)) {
          setClientsCount(data.length);
        } else if (data && typeof data === "object") {
          if (typeof data.count === "number") setClientsCount(data.count);
          else if (Array.isArray(data.results)) setClientsCount(data.results.length);
          else setClientsCount(0);
        } else {
          setClientsCount(0);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch clients:", err);
        if (mounted) setClientsCount(0);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">WELCOME ADMIN</h1>
            <p className="mt-2 text-gray-600">Overview of your workspace and quick stats.</p>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6 flex items-center">
              <div className="flex-1">
                <h2 className="text-sm font-medium text-gray-500">Clients</h2>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{loading ? "Loading..." : clientsCount}</p>
                <p className="mt-1 text-sm text-gray-500">Total registered clients</p>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-sm font-medium text-gray-500">Quick Actions</h2>
              <div className="mt-4 flex gap-3">
                <a href="/admin-dashboard" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded">Refresh</a>
                <a href="/admin/clients/add" className="inline-block px-4 py-2 border border-gray-200 rounded">Add Client</a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
