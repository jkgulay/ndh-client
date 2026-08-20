import { CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { fetchHospitalInfo, updateHospitalInfo } from "../../../api/settingsApi";
import type { HospitalInfoInput } from "../../../api/settingsApi";
import { ErrorState } from "../../../components/common/ErrorState";
import { LoadingState } from "../../../components/common/LoadingState";
import {
  FORM_INPUT_CLASSES as INPUT_CLASSES,
  FORM_LABEL_CLASSES as LABEL_CLASSES,
} from "../../../components/common/formStyles";
import { useFetch } from "../../../hooks/useFetch";
import type { HospitalInfo } from "../../../types/hospitalInfo.types";

const ACCREDITATIONS_HELP_TEXT = "One per line (e.g. DOH-licensed, PhilHealth-accredited).";

function toFormValues(hospitalInfo: HospitalInfo): HospitalInfoInput {
  return {
    name: hospitalInfo.name,
    tagline: hospitalInfo.tagline,
    address: hospitalInfo.address,
    phone: hospitalInfo.phone,
    emergencyHotline: hospitalInfo.emergencyHotline,
    email: hospitalInfo.email,
    hours: hospitalInfo.hours,
    foundedYear: hospitalInfo.foundedYear,
    bedCount: hospitalInfo.bedCount,
    departmentCount: hospitalInfo.departmentCount,
    accreditations: hospitalInfo.accreditations,
    facebookUrl: hospitalInfo.facebookUrl ?? "",
    googleMapsEmbedUrl: hospitalInfo.googleMapsEmbedUrl ?? "",
  };
}

function SettingsForm({ hospitalInfo }: { hospitalInfo: HospitalInfo }): React.JSX.Element {
  const [values, setValues] = useState<HospitalInfoInput>(toFormValues(hospitalInfo));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSubmitting(true);
    setServerError(null);
    setIsSaved(false);
    try {
      const response = await updateHospitalInfo(values);
      if (response.success) {
        setIsSaved(true);
      } else {
        setServerError(response.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("We couldn't save these changes. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={LABEL_CLASSES}>
          Hospital name
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
        <label htmlFor="tagline" className={LABEL_CLASSES}>
          Tagline
        </label>
        <input
          id="tagline"
          type="text"
          required
          value={values.tagline}
          onChange={(event) => setValues((prev) => ({ ...prev, tagline: event.target.value }))}
          className={INPUT_CLASSES}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="address" className={LABEL_CLASSES}>
          Address
        </label>
        <input
          id="address"
          type="text"
          required
          value={values.address}
          onChange={(event) => setValues((prev) => ({ ...prev, address: event.target.value }))}
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="phone" className={LABEL_CLASSES}>
          Main phone number
        </label>
        <input
          id="phone"
          type="text"
          required
          value={values.phone}
          onChange={(event) => setValues((prev) => ({ ...prev, phone: event.target.value }))}
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="emergencyHotline" className={LABEL_CLASSES}>
          Emergency hotline
        </label>
        <input
          id="emergencyHotline"
          type="text"
          required
          value={values.emergencyHotline}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, emergencyHotline: event.target.value }))
          }
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="email" className={LABEL_CLASSES}>
          General inquiry email
        </label>
        <input
          id="email"
          type="email"
          required
          value={values.email}
          onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="hours" className={LABEL_CLASSES}>
          Operating hours
        </label>
        <input
          id="hours"
          type="text"
          required
          value={values.hours}
          onChange={(event) => setValues((prev) => ({ ...prev, hours: event.target.value }))}
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="foundedYear" className={LABEL_CLASSES}>
          Founded year
        </label>
        <input
          id="foundedYear"
          type="number"
          required
          value={values.foundedYear}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, foundedYear: Number(event.target.value) }))
          }
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="bedCount" className={LABEL_CLASSES}>
          Bed count
        </label>
        <input
          id="bedCount"
          type="number"
          required
          value={values.bedCount}
          onChange={(event) => setValues((prev) => ({ ...prev, bedCount: Number(event.target.value) }))}
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="departmentCount" className={LABEL_CLASSES}>
          Department count
        </label>
        <input
          id="departmentCount"
          type="number"
          required
          value={values.departmentCount}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, departmentCount: Number(event.target.value) }))
          }
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="facebookUrl" className={LABEL_CLASSES}>
          Facebook URL
        </label>
        <input
          id="facebookUrl"
          type="text"
          value={values.facebookUrl}
          onChange={(event) => setValues((prev) => ({ ...prev, facebookUrl: event.target.value }))}
          className={INPUT_CLASSES}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="googleMapsEmbedUrl" className={LABEL_CLASSES}>
          Google Maps embed URL
        </label>
        <input
          id="googleMapsEmbedUrl"
          type="text"
          value={values.googleMapsEmbedUrl}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, googleMapsEmbedUrl: event.target.value }))
          }
          className={INPUT_CLASSES}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="accreditations" className={LABEL_CLASSES}>
          Accreditations
        </label>
        <textarea
          id="accreditations"
          rows={3}
          value={values.accreditations.join("\n")}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              accreditations: event.target.value.split("\n").filter((line) => line.trim() !== ""),
            }))
          }
          className={INPUT_CLASSES}
        />
        <p className="mt-1 text-sm text-slate-500">{ACCREDITATIONS_HELP_TEXT}</p>
      </div>

      {serverError && (
        <p role="alert" className="sm:col-span-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </p>
      )}

      {isSaved && (
        <p
          role="status"
          className="flex items-center gap-2 sm:col-span-2 rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-700"
        >
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          Changes saved. The public site now reflects this information.
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-primary-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

export function AdminSettingsPage(): React.JSX.Element {
  const { data: hospitalInfo, isLoading, error } = useFetch(fetchHospitalInfo);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-primary-900">Hospital Info</h1>
      {isLoading && <LoadingState label="Loading hospital information…" />}
      {!isLoading && error && <ErrorState message={error} />}
      {!isLoading && !error && hospitalInfo && <SettingsForm hospitalInfo={hospitalInfo} />}
    </div>
  );
}
