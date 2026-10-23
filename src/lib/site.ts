export const site = {
  name: "Plumb All and General",
  shortName: "Plumb All",
  tagline: "Industrial plumbing for Durban's plants, factories and facilities.",
  phoneDisplay: "082 708 4648",
  phoneTel: "+27827084648",
  whatsapp: "27827084648",
  city: "Durban",
  region: "KwaZulu-Natal",
  country: "South Africa",
};

export const telHref = `tel:${site.phoneTel}`;

export function whatsappHref(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Sectors", href: "#sectors" },
  { label: "Process", href: "#process" },
  { label: "Coverage", href: "#coverage" },
  { label: "Contact", href: "#contact" },
];
