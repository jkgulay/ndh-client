interface LocationMapProps {
  hospitalName: string;
  googleMapsEmbedUrl?: string;
}

const PLACEHOLDER_MAP_IMAGE_URL = "https://placehold.co/800x450?text=Map+Unavailable";

export function LocationMap({ hospitalName, googleMapsEmbedUrl }: LocationMapProps): React.JSX.Element {
  if (googleMapsEmbedUrl) {
    return (
      <iframe
        title={`Map showing the location of ${hospitalName}`}
        src={googleMapsEmbedUrl}
        className="h-80 w-full rounded-xl border border-slate-200"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <img
      src={PLACEHOLDER_MAP_IMAGE_URL}
      alt={`Map placeholder for ${hospitalName}`}
      className="h-80 w-full rounded-xl border border-slate-200 object-cover"
      width={800}
      height={450}
    />
  );
}
