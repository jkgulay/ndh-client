import { Plus } from "lucide-react";
import { ActiveStatusBadge } from "../../../components/Admin/ActiveStatusBadge";
import { ConfirmDeleteDialog } from "../../../components/Admin/ConfirmDeleteDialog";
import { DataTable, type DataTableColumn } from "../../../components/Admin/DataTable";
import { Modal } from "../../../components/Admin/Modal";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { deleteService, fetchAllServicesForAdmin } from "../../../api/servicesApi";
import { useAdminResourceList } from "../../../hooks/useAdminResourceList";
import type { Service } from "../../../types/service.types";
import { ServiceForm } from "./ServiceForm";

const COLUMNS: DataTableColumn<Service>[] = [
  { header: "Name", render: (item) => <span className="font-medium text-slate-800">{item.name}</span> },
  { header: "Category", render: (item) => <span className="text-sm text-slate-600">{item.category}</span> },
  { header: "Status", render: (item) => <ActiveStatusBadge isActive={item.isActive} /> },
];

export function AdminServicesPage(): React.JSX.Element {
  const {
    items: services,
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
    fetchAll: fetchAllServicesForAdmin,
    deleteItem: deleteService,
    getId: (item) => item._id,
    resourceLabel: "service",
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-primary-900">Services</h1>
        <button
          type="button"
          onClick={() => setEditingItem("new")}
          className="flex items-center gap-1.5 rounded-full bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add New
        </button>
      </div>

      {isLoading && <LoadingState label="Loading services…" />}
      {!isLoading && error && <ErrorState message={error} />}
      {!isLoading && !error && (
        <DataTable
          items={services ?? []}
          columns={COLUMNS}
          getRowKey={(item) => item._id}
          onEdit={setEditingItem}
          onDelete={setDeletingItem}
          emptyMessage="No services yet. Add the first one."
        />
      )}

      {editingItem && (
        <Modal
          title={editingItem === "new" ? "Add Service" : "Edit Service"}
          onClose={() => setEditingItem(null)}
        >
          <ServiceForm
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
