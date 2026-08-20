import { useState, type FormEvent } from "react";
import { createCareer, updateCareer } from "../../../api/careersApi";
import type { CareerInput } from "../../../api/careersApi";
import {
  FORM_ERROR_CLASSES as ERROR_CLASSES,
  FORM_INPUT_CLASSES as INPUT_CLASSES,
  FORM_LABEL_CLASSES as LABEL_CLASSES,
} from "../../../components/common/formStyles";
import { EMPLOYMENT_TYPES } from "../../../types/career.types";
import type { Career, EmploymentType } from "../../../types/career.types";

const EMPTY_VALUES: CareerInput = {
  title: "",
  department: "",
  type: EMPLOYMENT_TYPES[0],
  description: "",
  requirements: "",
  howToApply: "",
  isActive: true,
  postedAt: new Date().toISOString().slice(0, 10),
};

function toFormValues(career: Career | null): CareerInput {
  if (!career) return EMPTY_VALUES;
  return {
    title: career.title,
    department: career.department,
    type: career.type,
    description: career.description,
    requirements: career.requirements ?? "",
    howToApply: career.howToApply,
    isActive: career.isActive,
    postedAt: career.postedAt.slice(0, 10),
  };
}

interface CareerFormProps {
  initialValue: Career | null;
  onCancel: () => void;
  onSaved: () => void;
}

export function CareerForm({ initialValue, onCancel, onSaved }: CareerFormProps): React.JSX.Element {
  const [values, setValues] = useState<CareerInput>(toFormValues(initialValue));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSubmitting(true);
    setServerError(null);
    try {
      const response = initialValue
        ? await updateCareer(initialValue._id, values)
        : await createCareer(values);
      if (response.success) {
        onSaved();
      } else {
        setServerError(response.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("We couldn't save this job posting. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="title" className={LABEL_CLASSES}>
          Position title
        </label>
        <input
          id="title"
          type="text"
          required
          value={values.title}
          onChange={(event) => setValues((prev) => ({ ...prev, title: event.target.value }))}
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="department" className={LABEL_CLASSES}>
          Department
        </label>
        <input
          id="department"
          type="text"
          required
          value={values.department}
          onChange={(event) => setValues((prev) => ({ ...prev, department: event.target.value }))}
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="type" className={LABEL_CLASSES}>
          Employment type
        </label>
        <select
          id="type"
          required
          value={values.type}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, type: event.target.value as EmploymentType }))
          }
          className={INPUT_CLASSES}
        >
          {EMPLOYMENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="postedAt" className={LABEL_CLASSES}>
          Posted date
        </label>
        <input
          id="postedAt"
          type="date"
          required
          value={values.postedAt.slice(0, 10)}
          onChange={(event) => setValues((prev) => ({ ...prev, postedAt: event.target.value }))}
          className={INPUT_CLASSES}
        />
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
        <label htmlFor="requirements" className={LABEL_CLASSES}>
          Requirements
        </label>
        <textarea
          id="requirements"
          rows={3}
          value={values.requirements}
          onChange={(event) => setValues((prev) => ({ ...prev, requirements: event.target.value }))}
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="howToApply" className={LABEL_CLASSES}>
          How to apply
        </label>
        <textarea
          id="howToApply"
          rows={2}
          required
          value={values.howToApply}
          onChange={(event) => setValues((prev) => ({ ...prev, howToApply: event.target.value }))}
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
