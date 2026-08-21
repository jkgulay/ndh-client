import { Plus } from "lucide-react";
import { ActiveStatusBadge } from "../../../components/Admin/ActiveStatusBadge";
import { ConfirmDeleteDialog } from "../../../components/Admin/ConfirmDeleteDialog";
import { DataTable, type DataTableColumn } from "../../../components/Admin/DataTable";
import { Modal } from "../../../components/Admin/Modal";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { deleteCareer, fetchAllCareersForAdmin } from "../../../api/careersApi";
import { useAdminResourceList } from "../../../hooks/useAdminResourceList";
import type { Career } from "../../../types/career.types";
import { CareerForm } from "./CareerForm";

const COLUMNS: DataTableColumn<Career>[] = [
  { header: "Position", render: (item) => <span className="font-medium text-slate-800">{item.title}</span> },
  { header: "Department", render: (item) => item.department },
  { header: "Type", render: (item) => item.type },
  { header: "Status", render: (item) => <ActiveStatusBadge isActive={item.isActive} /> },
];

export function AdminCareersPage(): React.JSX.Element {
  const {
    items: careers,
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
    fetchAll: fetchAllCareersForAdmin,
    deleteItem: deleteCareer,
    getId: (item) => item._id,
    resourceLabel: "job posting",
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-primary-900">Careers</h1>
        <button
          type="button"
          onClick={() => setEditingItem("new")}
          className="flex items-center gap-1.5 rounded-full bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add New
        </button>
      </div>

      {isLoading && <LoadingState label="Loading job postings…" />}
      {!isLoading && error && <ErrorState message={error} />}
      {!isLoading && !error && (
        <DataTable
          items={careers ?? []}
          columns={COLUMNS}
          getRowKey={(item) => item._id}
          onEdit={setEditingItem}
          onDelete={setDeletingItem}
          emptyMessage="No job postings yet. Add the first one."
        />
      )}

      {editingItem && (
        <Modal
          title={editingItem === "new" ? "Add Job Posting" : "Edit Job Posting"}
          onClose={() => setEditingItem(null)}
        >
          <CareerForm
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
          itemLabel={deletingItem.title}
          isDeleting={isDeleting}
          error={deleteError}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
