import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voluntariados - Estrella del Sur",
  description: "Únete como voluntario y contribuye al desarrollo social en Oruro. Oportunidades de voluntariado y pasantías para hacer la diferencia en la comunidad.",
  openGraph: {
    title: "Voluntariados - Estrella del Sur",
    description: "Únete como voluntario y contribuye al desarrollo social en Oruro.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voluntariados - Estrella del Sur",
    description: "Únete como voluntario y contribuye al desarrollo social en Oruro.",
  },
};

export default function VoluntariadosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

