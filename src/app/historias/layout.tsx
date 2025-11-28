import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Historias de Impacto - Estrella del Sur",
  description: "Conoce las historias de transformación y éxito de las personas y comunidades que hemos apoyado. Testimonios reales del impacto de nuestro trabajo en Oruro.",
  openGraph: {
    title: "Historias de Impacto - Estrella del Sur",
    description: "Conoce las historias de transformación y éxito de las personas y comunidades que hemos apoyado.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Historias de Impacto - Estrella del Sur",
    description: "Conoce las historias de transformación y éxito de las personas y comunidades que hemos apoyado.",
  },
};

export default function HistoriasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

