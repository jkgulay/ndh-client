import { Clock, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { formatTelHref } from "../../utils/formatTelHref";
import type { HospitalInfo } from "../../types/hospitalInfo.types";

interface ContactDetailsProps {
  hospitalInfo: HospitalInfo;
}

export function ContactDetails({ hospitalInfo }: ContactDetailsProps): React.JSX.Element {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-3">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
        <div>
          <p className="font-semibold text-primary-900">{t("contactDetails.address")}</p>
          <p className="text-slate-600">{hospitalInfo.address}</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
        <div>
          <p className="font-semibold text-primary-900">{t("contactDetails.mainLine")}</p>
          <a href={formatTelHref(hospitalInfo.phone)} className="text-slate-600 hover:text-primary-700">
            {hospitalInfo.phone}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Phone className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
        <div>
          <p className="font-semibold text-primary-900">{t("contactDetails.emergencyHotline")}</p>
          <a
            href={formatTelHref(hospitalInfo.emergencyHotline)}
            className="font-semibold text-red-600 hover:text-red-700"
          >
            {hospitalInfo.emergencyHotline}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
        <div>
          <p className="font-semibold text-primary-900">{t("contactDetails.email")}</p>
          <a href={`mailto:${hospitalInfo.email}`} className="text-slate-600 hover:text-primary-700">
            {hospitalInfo.email}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
        <div>
          <p className="font-semibold text-primary-900">{t("contactDetails.hours")}</p>
          <p className="text-slate-600">{hospitalInfo.hours}</p>
        </div>
      </div>

      {hospitalInfo.facebookUrl && (
        <a
          href={hospitalInfo.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-800 hover:bg-primary-100"
        >
          <Facebook className="h-4 w-4" aria-hidden="true" />
          {t("contactDetails.followFacebook")}
        </a>
      )}
    </div>
  );
}
