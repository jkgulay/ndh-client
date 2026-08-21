import type { Doctor } from "../../types/doctor.types";

interface DoctorCardProps {
  doctor: Doctor;
}

const PLACEHOLDER_IMAGE_URL = "https://placehold.co/400x400?text=Doctor";

export function DoctorCard({ doctor }: DoctorCardProps): React.JSX.Element {
  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <img
        src={doctor.imageUrl ?? PLACEHOLDER_IMAGE_URL}
        alt={`Portrait of ${doctor.name}`}
        className="aspect-square w-full object-cover"
        width={400}
        height={400}
      />
      <div className="flex flex-1 flex-col gap-1 p-5">
        <h3 className="text-lg font-semibold text-primary-900">{doctor.name}</h3>
        <p className="text-sm font-medium text-accent-600">{doctor.specialization}</p>
        <p className="mt-2 text-sm text-slate-600">{doctor.schedule}</p>
        {doctor.bio && <p className="mt-2 text-sm text-slate-500">{doctor.bio}</p>}
      </div>
    </article>
  );
}
