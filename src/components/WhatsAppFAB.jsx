import { useWhatsAppNumber } from "../hooks/useWhatsAppNumber";

export default function WhatsAppFAB() {
  const whatsapp = useWhatsAppNumber();

  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-7 bottom-7 z-[99] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl no-underline shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 ease-out hover:scale-110 hover:bg-[#128C7E]"
    >
      💬
    </a>
  );
}
