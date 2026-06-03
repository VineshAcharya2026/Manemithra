import { useEffect, useState } from "react";
import { CTAButton } from "./ui";
import CompactQuoteForm from "./CompactQuoteForm";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";

export default function ConsultationModal({ onClose, meta = {} }) {
  const [submitted, setSubmitted] = useState(false);

  useLockBodyScroll(true);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const title = meta.packageName
    ? `${meta.packageName} Package`
    : meta.projectInterest
      ? "Project Enquiry"
      : "Free Quote";

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[200] flex items-end justify-center bg-black/60 p-3 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="animate-scale-in relative w-full max-w-md rounded-xl bg-white shadow-card-hover"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-gray-light px-4 py-3">
          <div className="min-w-0">
            <p className="font-sans text-[10px] font-bold tracking-widest text-gold uppercase">
              Manemithra
            </p>
            <h2 id="modal-title" className="truncate font-sans text-base font-bold text-navy">
              {submitted ? "Thank you!" : title}
            </h2>
            {!submitted && (
              <p className="mt-0.5 font-sans text-[11px] text-muted">
                Quick quote — we respond within 24 hours.
              </p>
            )}
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-lg text-muted transition-colors hover:bg-surface hover:text-navy"
          >
            ×
          </button>
        </div>

        <div className="max-h-[min(70vh,520px)] overflow-y-auto px-4 py-3">
          {!submitted ? (
            <CompactQuoteForm
              key={JSON.stringify(meta)}
              meta={{ ...meta, source: meta.source || "consultation popup" }}
              onSuccess={() => setSubmitted(true)}
            />
          ) : (
            <div className="py-4 text-center">
              <p className="mb-1 text-3xl" aria-hidden="true">
                ✓
              </p>
              <p className="mb-4 font-sans text-sm text-muted">
                WhatsApp opened with your details. Our team will follow up shortly.
              </p>
              <CTAButton onClick={onClose} primary className="!py-2.5 !text-xs">
                Done
              </CTAButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
