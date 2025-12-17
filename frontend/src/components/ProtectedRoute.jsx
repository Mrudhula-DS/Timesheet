import { useAuth } from "../auth/AuthProvider";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();

  if (!auth) return null;

  const { user, loading } = auth;

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
