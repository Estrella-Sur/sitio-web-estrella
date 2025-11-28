import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros - Estrella del Sur",
  description: "Conoce nuestra misión, visión, valores y el equipo que trabaja día a día para transformar vidas en Oruro. Descubre nuestra historia y el impacto que generamos en la comunidad.",
  openGraph: {
    title: "Nosotros - Estrella del Sur",
    description: "Conoce nuestra misión, visión, valores y el equipo que trabaja día a día para transformar vidas en Oruro.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros - Estrella del Sur",
    description: "Conoce nuestra misión, visión, valores y el equipo que trabaja día a día para transformar vidas en Oruro.",
  },
};

export default function NosotrosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

