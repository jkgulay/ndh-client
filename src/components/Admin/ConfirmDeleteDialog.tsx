import { Modal } from "./Modal";

interface ConfirmDeleteDialogProps {
  itemLabel: string;
  isDeleting: boolean;
  error?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDeleteDialog({
  itemLabel,
  isDeleting,
  error,
  onConfirm,
  onCancel,
}: ConfirmDeleteDialogProps): React.JSX.Element {
  return (
    <Modal title="Delete confirmation" onClose={onCancel}>
      <p className="text-slate-600">
        Are you sure you want to permanently delete <span className="font-semibold">{itemLabel}</span>
        ? This cannot be undone.
      </p>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
          className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDeleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </Modal>
  );
}
