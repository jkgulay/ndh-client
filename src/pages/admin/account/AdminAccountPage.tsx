import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { changeAdminCredentials, fetchAdminProfile } from "../../../api/adminAuthApi";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import {
  FORM_ERROR_CLASSES as ERROR_CLASSES,
  FORM_INPUT_CLASSES as INPUT_CLASSES,
  FORM_LABEL_CLASSES as LABEL_CLASSES,
} from "../../../components/common/formStyles";
import { useAdminAuth } from "../../../hooks/useAdminAuth";
import { useFetch } from "../../../hooks/useFetch";

const MIN_PASSWORD_LENGTH = 8;

function AccountForm({ currentUsername }: { currentUsername: string }): React.JSX.Element {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>(currentUsername);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    setNewUsername(currentUsername);
  }, [currentUsername]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setServerError(null);

    if (newPassword && newPassword.length < MIN_PASSWORD_LENGTH) {
      setServerError(`New password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
      return;
    }
    if (newPassword && newPassword !== confirmNewPassword) {
      setServerError("New password and confirmation do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await changeAdminCredentials({
        currentPassword,
        newUsername,
        newPassword: newPassword || undefined,
      });
      if (response.success) {
        logout();
        navigate("/admin/login", { state: { credentialsUpdated: true } });
      } else {
        setServerError(response.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("We couldn't reach the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex max-w-md flex-col gap-4">
      <div>
        <label htmlFor="newUsername" className={LABEL_CLASSES}>
          Username
        </label>
        <input
          id="newUsername"
          type="text"
          required
          value={newUsername}
          onChange={(event) => setNewUsername(event.target.value)}
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="newPassword" className={LABEL_CLASSES}>
          New password
        </label>
        <input
          id="newPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Leave blank to keep current password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          className={INPUT_CLASSES}
        />
      </div>

      {newPassword && (
        <div>
          <label htmlFor="confirmNewPassword" className={LABEL_CLASSES}>
            Confirm new password
          </label>
          <input
            id="confirmNewPassword"
            type="password"
            autoComplete="new-password"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
            className={INPUT_CLASSES}
          />
        </div>
      )}

      <div>
        <label htmlFor="currentPassword" className={LABEL_CLASSES}>
          Current password
        </label>
        <input
          id="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Required to confirm these changes"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          className={INPUT_CLASSES}
        />
      </div>

      {serverError && (
        <p role="alert" className={ERROR_CLASSES}>
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 self-start rounded-full bg-primary-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving…" : "Save Changes"}
      </button>
      <p className="text-sm text-slate-500">
        Saving will sign you out. Log back in with your updated credentials.
      </p>
    </form>
  );
}

export function AdminAccountPage(): React.JSX.Element {
  const { data: profile, isLoading, error } = useFetch(fetchAdminProfile);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-primary-900">Account</h1>
      {isLoading && <LoadingState label="Loading account details…" />}
      {!isLoading && error && <ErrorState message={error} />}
      {!isLoading && !error && profile && <AccountForm currentUsername={profile.username} />}
    </div>
  );
}
