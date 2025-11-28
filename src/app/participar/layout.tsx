import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Participar - Estrella del Sur",
  description: "Descubre las diferentes formas de participar y colaborar con Estrella del Sur. Voluntariado, donaciones, alianzas y más oportunidades para hacer la diferencia.",
  openGraph: {
    title: "Participar - Estrella del Sur",
    description: "Descubre las diferentes formas de participar y colaborar con Estrella del Sur.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Participar - Estrella del Sur",
    description: "Descubre las diferentes formas de participar y colaborar con Estrella del Sur.",
  },
};

export default function ParticiparLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

