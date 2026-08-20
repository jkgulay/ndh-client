import { Clock } from "lucide-react";
import { getServiceCategoryIcon } from "../../utils/serviceCategoryIcon";
import type { Service } from "../../types/service.types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps): React.JSX.Element {
  const CategoryIcon = getServiceCategoryIcon(service.category);

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="w-fit rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
          {service.category}
        </span>
        <CategoryIcon className="h-5 w-5 text-accent-600" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-primary-900">{service.name}</h3>
      <p className="flex-1 text-sm text-slate-600">{service.description}</p>
      {service.operatingHours && (
        <p className="flex items-center gap-1.5 text-sm text-slate-500">
          <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
          {service.operatingHours}
        </p>
      )}
    </article>
  );
}
