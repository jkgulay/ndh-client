import { useMemo, useState } from "react";
import { useDoctors } from "./useDoctors";
import type { Doctor } from "../types/doctor.types";

const ALL_SPECIALIZATIONS_OPTION = "All Specializations";

export function useDoctorDirectory(): {
  filteredDoctors: Doctor[];
  specializations: string[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedSpecialization: string;
  setSelectedSpecialization: (value: string) => void;
  isLoading: boolean;
  error: string | null;
} {
  const { doctors, isLoading, error } = useDoctors();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>(ALL_SPECIALIZATIONS_OPTION);

  const specializations = useMemo(() => {
    const unique = new Set((doctors ?? []).map((doctor) => doctor.specialization));
    return [ALL_SPECIALIZATIONS_OPTION, ...Array.from(unique).sort()];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return (doctors ?? []).filter((doctor) => {
      const matchesSpecialization =
        selectedSpecialization === ALL_SPECIALIZATIONS_OPTION ||
        doctor.specialization === selectedSpecialization;
      const matchesSearch = doctor.name.toLowerCase().includes(normalizedSearch);
      return matchesSpecialization && matchesSearch;
    });
  }, [doctors, searchTerm, selectedSpecialization]);

  return {
    filteredDoctors,
    specializations,
    searchTerm,
    setSearchTerm,
    selectedSpecialization,
    setSelectedSpecialization,
    isLoading,
    error,
  };
}
