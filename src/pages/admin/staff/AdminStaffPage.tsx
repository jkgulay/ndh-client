import { Plus } from "lucide-react";
import { useState } from "react";
import { ConfirmDeleteDialog } from "../../../components/Admin/ConfirmDeleteDialog";
import { DataTable, type DataTableColumn } from "../../../components/Admin/DataTable";
import { Modal } from "../../../components/Admin/Modal";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { deleteStaffMember, fetchAllStaffForAdmin } from "../../../api/staffApi";
import { useFetch } from "../../../hooks/useFetch";
import type { StaffMember } from "../../../types/staff.types";
import { StaffForm } from "./StaffForm";

const COLUMNS: DataTableColumn<StaffMember>[] = [
  { header: "Name", render: (item) => <span className="font-medium text-slate-800">{item.name}</span> },
  { header: "Role", render: (item) => item.role },
  { header: "Schedule", render: (item) => item.schedule },
  {
    header: "Status",
    render: (item) => (
      <span
        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          item.isActive ? "bg-accent-100 text-accent-700" : "bg-slate-100 text-slate-500"
        }`}
      >
        {item.isActive ? "Active" : "Inactive"}
      </span>
    ),
  },
];

export function AdminStaffPage(): React.JSX.Element {
  const { data: staff, isLoading, error, refetch } = useFetch(fetchAllStaffForAdmin);
  const [editingItem, setEditingItem] = useState<StaffMember | null | "new">(null);
  const [deletingItem, setDeletingItem] = useState<StaffMember | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleConfirmDelete(): Promise<void> {
    if (!deletingItem) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const response = await deleteStaffMember(deletingItem._id);
      if (response.success) {
        setDeletingItem(null);
        refetch();
      } else {
        setDeleteError(response.error ?? "Unable to delete this staff member.");
      }
    } catch {
      setDeleteError("We couldn't reach the server. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-primary-900">Staff</h1>
        <button
          type="button"
          onClick={() => setEditingItem("new")}
          className="flex items-center gap-1.5 rounded-full bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add New
        </button>
      </div>

      {isLoading && <LoadingState label="Loading staff…" />}
      {!isLoading && error && <ErrorState message={error} />}
      {!isLoading && !error && (
        <DataTable
          items={staff ?? []}
          columns={COLUMNS}
          getRowKey={(item) => item._id}
          onEdit={setEditingItem}
          onDelete={setDeletingItem}
          emptyMessage="No staff yet. Add the first one."
        />
      )}

      {editingItem && (
        <Modal title={editingItem === "new" ? "Add Staff Member" : "Edit Staff Member"} onClose={() => setEditingItem(null)}>
          <StaffForm
            initialValue={editingItem === "new" ? null : editingItem}
            onCancel={() => setEditingItem(null)}
            onSaved={() => {
              setEditingItem(null);
              refetch();
            }}
          />
        </Modal>
      )}

      {deletingItem && (
        <ConfirmDeleteDialog
          itemLabel={deletingItem.name}
          isDeleting={isDeleting}
          error={deleteError}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
