import { Trash2 } from "lucide-react";
import { useState } from "react";
import { ConfirmDeleteDialog } from "../../../components/Admin/ConfirmDeleteDialog";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import { StarRatingDisplay } from "../../../components/FeedbackSection/StarRating";
import { deleteFeedback, fetchAllFeedbackForAdmin } from "../../../api/feedbackApi";
import { useFetch } from "../../../hooks/useFetch";
import { formatDate } from "../../../utils/formatDate";
import type { Feedback } from "../../../types/feedback.types";

function getAverageRating(feedback: Feedback[]): string {
  if (feedback.length === 0) return "—";
  const total = feedback.reduce((sum, item) => sum + item.rating, 0);
  return (total / feedback.length).toFixed(1);
}

export function AdminFeedbackPage(): React.JSX.Element {
  const { data: feedback, isLoading, error, refetch } = useFetch(fetchAllFeedbackForAdmin);
  const [deletingItem, setDeletingItem] = useState<Feedback | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleConfirmDelete(): Promise<void> {
    if (!deletingItem) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const response = await deleteFeedback(deletingItem._id);
      if (response.success) {
        setDeletingItem(null);
        refetch();
      } else {
        setDeleteError(response.error ?? "Unable to delete this feedback.");
      }
    } catch {
      setDeleteError("We couldn't reach the server. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

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
      {!isLoading && !error && (!feedback || feedback.length === 0) && (
        <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-10 text-center text-slate-500">
          No feedback has been submitted yet.
        </p>
      )}
      {!isLoading && !error && feedback && feedback.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th scope="col" className="px-4 py-3">Date</th>
                <th scope="col" className="px-4 py-3">Rating</th>
                <th scope="col" className="px-4 py-3">Comment</th>
                <th scope="col" className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feedback.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 align-top text-slate-700">{formatDate(item.createdAt)}</td>
                  <td className="px-4 py-3 align-top"><StarRatingDisplay rating={item.rating} /></td>
                  <td className="px-4 py-3 align-top text-slate-700">
                    {item.comment ? item.comment : <span className="italic text-slate-400">No comment left</span>}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setDeletingItem(item)}
                        aria-label="Delete"
                        className="rounded-md p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
