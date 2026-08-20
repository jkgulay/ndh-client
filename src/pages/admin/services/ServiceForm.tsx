import { useState, type FormEvent } from "react";
import { createService, updateService } from "../../../api/servicesApi";
import type { ServiceInput } from "../../../api/servicesApi";
import {
  FORM_ERROR_CLASSES as ERROR_CLASSES,
  FORM_INPUT_CLASSES as INPUT_CLASSES,
  FORM_LABEL_CLASSES as LABEL_CLASSES,
} from "../../../components/common/formStyles";
import { SERVICE_CATEGORIES } from "../../../types/service.types";
import type { Service, ServiceCategory } from "../../../types/service.types";

const EMPTY_VALUES: ServiceInput = {
  name: "",
  description: "",
  category: SERVICE_CATEGORIES[0],
  operatingHours: "",
  isActive: true,
};

function toFormValues(service: Service | null): ServiceInput {
  if (!service) return EMPTY_VALUES;
  return {
    name: service.name,
    description: service.description,
    category: service.category,
    operatingHours: service.operatingHours ?? "",
    isActive: service.isActive,
  };
}

interface ServiceFormProps {
  initialValue: Service | null;
  onCancel: () => void;
  onSaved: () => void;
}

export function ServiceForm({ initialValue, onCancel, onSaved }: ServiceFormProps): React.JSX.Element {
  const [values, setValues] = useState<ServiceInput>(toFormValues(initialValue));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSubmitting(true);
    setServerError(null);
    try {
      const response = initialValue
        ? await updateService(initialValue._id, values)
        : await createService(values);
      if (response.success) {
        onSaved();
      } else {
        setServerError(response.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("We couldn't save this service. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className={LABEL_CLASSES}>
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={values.name}
          onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="category" className={LABEL_CLASSES}>
          Category
        </label>
        <select
          id="category"
          required
          value={values.category}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, category: event.target.value as ServiceCategory }))
          }
          className={INPUT_CLASSES}
        >
          {SERVICE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className={LABEL_CLASSES}>
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          required
          value={values.description}
          onChange={(event) => setValues((prev) => ({ ...prev, description: event.target.value }))}
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="operatingHours" className={LABEL_CLASSES}>
          Operating hours
        </label>
        <input
          id="operatingHours"
          type="text"
          placeholder="e.g. 24/7 or Mon–Fri, 8:00 AM–5:00 PM"
          value={values.operatingHours}
          onChange={(event) => setValues((prev) => ({ ...prev, operatingHours: event.target.value }))}
          className={INPUT_CLASSES}
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          checked={values.isActive}
          onChange={(event) => setValues((prev) => ({ ...prev, isActive: event.target.checked }))}
          className="h-4 w-4 rounded border-slate-300 text-primary-700 focus:ring-primary-400"
        />
        Active (visible on the public site)
      </label>

      {serverError && (
        <p role="alert" className={ERROR_CLASSES}>
          {serverError}
        </p>
      )}

      <div className="mt-2 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
