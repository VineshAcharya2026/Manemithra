import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { isUserAdmin } from "../../lib/adminAuth";
import { ROUTES } from "../../lib/routes";

export default function AdminLoginPage() {
  const { user, isAdmin, loading, login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate(ROUTES.adminDashboard, { replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p className="text-muted">Loading…</p>
      </div>
    );
  }

  if (user && isAdmin) {
    return <Navigate to={ROUTES.adminDashboard} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const cred = await login(email.trim(), password);
      const ok = await isUserAdmin(cred.user);
      if (ok) {
        navigate(ROUTES.adminDashboard, { replace: true });
      }
    } catch (err) {
      const code = err?.code || "";
      if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
        setError("Invalid email or password.");
      } else if (code === "auth/user-not-found") {
        setError("No account found. Create a user in Firebase Authentication first.");
      } else if (code === "auth/operation-not-allowed") {
        setError("Email/password sign-in is not enabled. Enable it in Firebase Console → Authentication.");
      } else {
        setError(err.message || "Sign-in failed.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-hero px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-light bg-white p-8 shadow-card">
        <h1 className="mb-1 font-serif text-2xl font-bold text-teal">Mane Mithra Admin</h1>
        <p className="mb-6 text-sm text-muted">
          Single admin sign-in — manage all site text, images, projects, and media.
        </p>

        {user && !isAdmin && (
          <div className="mb-4 rounded-lg bg-error-bg px-3 py-2 text-sm text-error-text">
            <p className="font-semibold">This account is not an admin yet.</p>
            <p className="mt-2 text-xs">
              In Firebase Console → Firestore, create document:
            </p>
            <p className="mt-1 break-all font-mono text-[11px] text-teal">
              Collection: <strong>admins</strong>
              <br />
              Document ID: <strong>{user.uid}</strong>
            </p>
            <p className="mt-1 text-xs">(any field, e.g. role: admin) then refresh this page.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-teal">Email</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-teal">Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-sm text-error-text">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          <Link to={ROUTES.home} className="text-gold hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
