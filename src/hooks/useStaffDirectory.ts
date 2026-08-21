import { useMemo, useState } from "react";
import { useStaff } from "./useStaff";
import type { StaffMember } from "../types/staff.types";

export const ALL_ROLES_OPTION = "All Roles";

export function useStaffDirectory(): {
  filteredStaff: StaffMember[];
  roles: string[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedRole: string;
  setSelectedRole: (value: string) => void;
  isLoading: boolean;
  error: string | null;
} {
  const { staff, isLoading, error } = useStaff();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>(ALL_ROLES_OPTION);

  const roles = useMemo(() => {
    const unique = new Set((staff ?? []).map((member) => member.role));
    return [ALL_ROLES_OPTION, ...Array.from(unique).sort()];
  }, [staff]);

  const filteredStaff = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return (staff ?? []).filter((member) => {
      const matchesRole = selectedRole === ALL_ROLES_OPTION || member.role === selectedRole;
      const matchesSearch = member.name.toLowerCase().includes(normalizedSearch);
      return matchesRole && matchesSearch;
    });
  }, [staff, searchTerm, selectedRole]);

  return {
    filteredStaff,
    roles,
    searchTerm,
    setSearchTerm,
    selectedRole,
    setSelectedRole,
    isLoading,
    error,
  };
}
