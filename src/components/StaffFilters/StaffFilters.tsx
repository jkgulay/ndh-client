import { Search } from "lucide-react";

interface StaffFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roles: string[];
  selectedRole: string;
  onRoleChange: (value: string) => void;
}

export function StaffFilters({
  searchTerm,
  onSearchChange,
  roles,
  selectedRole,
  onRoleChange,
}: StaffFiltersProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search staff by name"
          aria-label="Search staff by name"
          className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>

      <label className="sr-only" htmlFor="role-filter">
        Filter by role
      </label>
      <select
        id="role-filter"
        value={selectedRole}
        onChange={(event) => onRoleChange(event.target.value)}
        className="rounded-lg border border-slate-300 px-4 py-2.5 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200 sm:w-64"
      >
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
}
