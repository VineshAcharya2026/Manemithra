import { useState } from "react";
import { useSiteContent } from "../hooks/useSiteContent";

export default function Logo({ variant = "light", className = "", height = 48 }) {
  const { data: brand } = useSiteContent("brand");
  const [failed, setFailed] = useState(false);
  const fallback = variant === "dark" ? "/logo-dark.jpg" : "/logo-light.jpg";
  const src =
    variant === "dark"
      ? brand?.logoDarkUrl || fallback
      : brand?.logoLightUrl || fallback;

  if (failed) {
    return (
      <span
        className={`font-serif font-bold tracking-wide text-gold ${className}`}
        style={{ fontSize: height ? `${height * 0.35}px` : undefined }}
      >
        MANE MITHRA
      </span>
    );
  }

  return (
    <img
      src={src}
      alt="Mane Mithra — A home of comfort and happiness"
      height={height}
      className={`m-0 block p-0 ${className}`}
      style={height && !className.includes("nav-logo") ? { height: `${height}px` } : undefined}
      onError={() => setFailed(true)}
    />
  );
}
