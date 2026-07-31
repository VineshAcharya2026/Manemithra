import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { ROUTES } from "../../lib/routes";

export default function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p className="text-muted">Loading…</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to={ROUTES.admin} replace />;
  }

  return children;
}
