import { Plus } from "lucide-react";
import { ActiveStatusBadge } from "../../../components/Admin/ActiveStatusBadge";
import { ConfirmDeleteDialog } from "../../../components/Admin/ConfirmDeleteDialog";
import { DataTable, type DataTableColumn } from "../../../components/Admin/DataTable";
import { Modal } from "../../../components/Admin/Modal";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { deleteStaffMember, fetchAllStaffForAdmin } from "../../../api/staffApi";
import { useAdminResourceList } from "../../../hooks/useAdminResourceList";
import type { StaffMember } from "../../../types/staff.types";
import { StaffForm } from "./StaffForm";

const COLUMNS: DataTableColumn<StaffMember>[] = [
  { header: "Name", render: (item) => <span className="font-medium text-slate-800">{item.name}</span> },
  { header: "Role", render: (item) => item.role },
  { header: "Schedule", render: (item) => item.schedule },
  { header: "Status", render: (item) => <ActiveStatusBadge isActive={item.isActive} /> },
];

export function AdminStaffPage(): React.JSX.Element {
  const {
    items: staff,
    isLoading,
    error,
    refetch,
    editingItem,
    setEditingItem,
    deletingItem,
    setDeletingItem,
    isDeleting,
    deleteError,
    handleConfirmDelete,
  } = useAdminResourceList({
    fetchAll: fetchAllStaffForAdmin,
    deleteItem: deleteStaffMember,
    getId: (item) => item._id,
    resourceLabel: "staff member",
  });

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
