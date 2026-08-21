import type { StaffMember } from "../../types/staff.types";

interface StaffCardProps {
  member: StaffMember;
}

const PLACEHOLDER_IMAGE_URL = "https://placehold.co/400x400?text=Staff";

export function StaffCard({ member }: StaffCardProps): React.JSX.Element {
  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden bg-surface-tint p-4">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={member.imageUrl ?? PLACEHOLDER_IMAGE_URL}
            alt={`Portrait of ${member.name}`}
            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-110"
            width={400}
            height={400}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5">
        <h3 className="font-serif text-lg font-medium text-primary-900">{member.name}</h3>
        <p className="text-sm font-bold text-accent-600">{member.role}</p>
        <p className="mt-2 text-sm text-slate-500">{member.schedule}</p>
        {member.bio && <p className="mt-2 text-sm text-slate-400">{member.bio}</p>}
      </div>
    </article>
  );
}
