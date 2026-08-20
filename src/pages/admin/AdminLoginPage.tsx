import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import {
  FORM_INPUT_CLASSES as INPUT_CLASSES,
  FORM_LABEL_CLASSES as LABEL_CLASSES,
} from "../../components/common/formStyles";
import { consumeAdminSessionExpiredFlag } from "../../utils/adminToken";

interface AdminLoginLocationState {
  credentialsUpdated?: boolean;
}

export function AdminLoginPage(): React.JSX.Element {
  const { isAuthenticated, isSubmitting, error, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { credentialsUpdated } = (location.state as AdminLoginLocationState | null) ?? {};
  const [wasSessionExpired] = useState<boolean>(() => consumeAdminSessionExpiredFlag());
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const didLogIn = await login(username, password);
    if (didLogIn) navigate("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-xl font-bold text-primary-900">Admin Login</h1>
        {wasSessionExpired && (
          <p role="alert" className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Your session expired before that request finished, so nothing was saved. Please log in
            again and retry.
          </p>
        )}
        {!wasSessionExpired && credentialsUpdated && (
          <p role="status" className="mb-4 rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-700">
            Your credentials were updated. Please log in again.
          </p>
        )}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className={LABEL_CLASSES}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={INPUT_CLASSES}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className={LABEL_CLASSES}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={INPUT_CLASSES}
              required
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-full bg-primary-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
