import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impacto - Estrella del Sur",
  description: "Conoce el impacto de nuestro trabajo en Oruro. Estadísticas, resultados y logros que demuestran cómo transformamos vidas y comunidades.",
  openGraph: {
    title: "Impacto - Estrella del Sur",
    description: "Conoce el impacto de nuestro trabajo en Oruro. Estadísticas, resultados y logros.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impacto - Estrella del Sur",
    description: "Conoce el impacto de nuestro trabajo en Oruro. Estadísticas, resultados y logros.",
  },
};

export default function ImpactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

