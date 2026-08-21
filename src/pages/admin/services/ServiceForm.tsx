import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { createService, updateService, uploadServiceImage } from "../../../api/servicesApi";
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
  imageUrl: "",
  isActive: true,
};

function toFormValues(service: Service | null): ServiceInput {
  if (!service) return EMPTY_VALUES;
  return {
    name: service.name,
    description: service.description,
    category: service.category,
    operatingHours: service.operatingHours ?? "",
    imageUrl: service.imageUrl ?? "",
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
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleImageFileChange(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setUploadError(null);
    try {
      const response = await uploadServiceImage(file);
      if (response.success && response.data) {
        const uploadedUrl = response.data.url;
        setValues((prev) => ({ ...prev, imageUrl: uploadedUrl }));
      } else {
        setUploadError(response.error ?? "Unable to upload this image. Please try again.");
      }
    } catch {
      setUploadError("We couldn't upload this image. Please check your connection.");
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

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

      <div>
        <span className={LABEL_CLASSES}>Image (shown in the homepage service gallery)</span>
        <div className="flex items-center gap-4">
          {values.imageUrl ? (
            <img
              src={values.imageUrl}
              alt="Service image preview"
              className="h-20 w-20 shrink-0 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-400">
              No image
            </div>
          )}
          <div className="flex flex-1 flex-col gap-1.5">
            <input
              ref={fileInputRef}
              id="imageFile"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageFileChange}
              disabled={isUploadingImage}
              className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
            />
            {isUploadingImage && <p className="text-sm text-slate-500">Uploading…</p>}
            {uploadError && (
              <p role="alert" className={ERROR_CLASSES}>
                {uploadError}
              </p>
            )}
          </div>
        </div>
        <label htmlFor="imageUrl" className="mt-3 block text-xs text-slate-500">
          Or paste an image URL directly
        </label>
        <input
          id="imageUrl"
          type="text"
          placeholder="https://placehold.co/900x1200"
          value={values.imageUrl}
          onChange={(event) => setValues((prev) => ({ ...prev, imageUrl: event.target.value }))}
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
          disabled={isSubmitting || isUploadingImage}
          className="rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
