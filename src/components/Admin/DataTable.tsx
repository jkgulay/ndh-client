import { Pencil, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

export interface DataTableColumn<T> {
  header: string;
  render: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  items: T[];
  columns: DataTableColumn<T>[];
  getRowKey: (item: T) => string;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  emptyMessage: string;
}

export function DataTable<T>({
  items,
  columns,
  getRowKey,
  onEdit,
  onDelete,
  emptyMessage,
}: DataTableProps<T>): React.JSX.Element {
  if (items.length === 0) {
    return <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-10 text-center text-slate-500">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            {columns.map((column) => (
              <th key={column.header} scope="col" className="px-4 py-3">
                {column.header}
              </th>
            ))}
            <th scope="col" className="px-4 py-3 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr key={getRowKey(item)} className="hover:bg-slate-50">
              {columns.map((column) => (
                <td key={column.header} className="px-4 py-3 align-top text-slate-700">
                  {column.render(item)}
                </td>
              ))}
              <td className="px-4 py-3 align-top">
                <div className="flex justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    aria-label="Edit"
                    className="rounded-md p-2 text-primary-700 hover:bg-primary-50"
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(item)}
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
  );
}
