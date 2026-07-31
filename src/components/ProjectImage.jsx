import { useEffect, useState } from "react";

/**
 * Project photo with gradient fallback when image fails to load.
 * Resets error state when src changes so thumbnails update correctly.
 */
export default function ProjectImage({ src, alt, gradient, className = "" }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient} ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-5xl opacity-40" aria-hidden="true">
          🏡
        </span>
      </div>
    );
  }

  return (
    <img
      key={src}
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
