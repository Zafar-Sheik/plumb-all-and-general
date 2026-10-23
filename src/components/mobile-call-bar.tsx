import { MessageCircle, Phone } from "lucide-react";
import { site, telHref, whatsappHref } from "@/lib/site";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 flex gap-2 rounded-2xl border border-white/10 bg-steel-900/90 p-2 backdrop-blur-xl sm:hidden">
      <a
        href={telHref}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-flame py-3 text-sm font-semibold text-steel-950"
      >
        <Phone className="h-4 w-4" /> Call {site.phoneDisplay}
      </a>
      <a
        href={whatsappHref(`Hi ${site.name}, I'd like to enquire about industrial plumbing work.`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp"
        className="flex w-14 items-center justify-center rounded-xl border border-white/10 text-white"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}
