import { ConfirmDeleteDialog } from "../../../components/Admin/ConfirmDeleteDialog";
import { DataTable, type DataTableColumn } from "../../../components/Admin/DataTable";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { StarRatingDisplay } from "../../../components/FeedbackSection/StarRating";
import { deleteFeedback, fetchAllFeedbackForAdmin } from "../../../api/feedbackApi";
import { useAdminResourceList } from "../../../hooks/useAdminResourceList";
import { formatDate } from "../../../utils/formatDate";
import type { Feedback } from "../../../types/feedback.types";

function getAverageRating(feedback: Feedback[]): string {
  if (feedback.length === 0) return "—";
  const total = feedback.reduce((sum, item) => sum + item.rating, 0);
  return (total / feedback.length).toFixed(1);
}

const COLUMNS: DataTableColumn<Feedback>[] = [
  { header: "Date", render: (item) => formatDate(item.createdAt) },
  { header: "Rating", render: (item) => <StarRatingDisplay rating={item.rating} /> },
  {
    header: "Comment",
    render: (item) => item.comment || <span className="italic text-slate-400">No comment left</span>,
  },
];

export function AdminFeedbackPage(): React.JSX.Element {
  const {
    items: feedback,
    isLoading,
    error,
    deletingItem,
    setDeletingItem,
    isDeleting,
    deleteError,
    handleConfirmDelete,
  } = useAdminResourceList({
    fetchAll: fetchAllFeedbackForAdmin,
    deleteItem: deleteFeedback,
    getId: (item) => item._id,
    resourceLabel: "feedback",
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-primary-900">Patient Feedback</h1>
        {feedback && feedback.length > 0 && (
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm">
            <span className="font-bold text-primary-800">{getAverageRating(feedback)}</span>
            <span className="text-slate-500">average · {feedback.length} response{feedback.length === 1 ? "" : "s"}</span>
          </div>
        )}
      </div>

      {isLoading && <LoadingState label="Loading feedback…" />}
      {!isLoading && error && <ErrorState message={error} />}
      {!isLoading && !error && (
        <DataTable
          items={feedback ?? []}
          columns={COLUMNS}
          getRowKey={(item) => item._id}
          onDelete={setDeletingItem}
          emptyMessage="No feedback has been submitted yet."
        />
      )}

      {deletingItem && (
        <ConfirmDeleteDialog
          itemLabel={`this ${deletingItem.rating}-star feedback entry`}
          isDeleting={isDeleting}
          error={deleteError}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
