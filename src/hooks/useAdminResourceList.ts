import { useState } from "react";
import { useFetch } from "./useFetch";
import type { ApiResponse } from "../types/common.types";

interface UseAdminResourceListOptions<T> {
  fetchAll: () => Promise<ApiResponse<T[]>>;
  deleteItem: (id: string) => Promise<ApiResponse<never>>;
  getId: (item: T) => string;
  resourceLabel: string;
}

interface UseAdminResourceListResult<T> {
  items: T[] | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  editingItem: T | null | "new";
  setEditingItem: (item: T | null | "new") => void;
  deletingItem: T | null;
  setDeletingItem: (item: T | null) => void;
  isDeleting: boolean;
  deleteError: string | null;
  handleConfirmDelete: () => Promise<void>;
}

/**
 * Every admin list page (announcements, staff, careers, services, feedback) fetches a list,
 * tracks which item is being edited/deleted, and runs the same delete-confirm-refetch flow.
 * This hook is that shape; each page still owns its own columns, form, and empty-state copy.
 */
export function useAdminResourceList<T>({
  fetchAll,
  deleteItem,
  getId,
  resourceLabel,
}: UseAdminResourceListOptions<T>): UseAdminResourceListResult<T> {
  const { data: items, isLoading, error, refetch } = useFetch(fetchAll);
  const [editingItem, setEditingItem] = useState<T | null | "new">(null);
  const [deletingItem, setDeletingItem] = useState<T | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleConfirmDelete(): Promise<void> {
    if (!deletingItem) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const response = await deleteItem(getId(deletingItem));
      if (response.success) {
        setDeletingItem(null);
        refetch();
      } else {
        setDeleteError(response.error ?? `Unable to delete this ${resourceLabel}.`);
      }
    } catch {
      setDeleteError("We couldn't reach the server. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return {
    items,
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
  };
}
