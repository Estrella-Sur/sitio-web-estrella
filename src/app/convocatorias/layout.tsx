import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convocatorias - Estrella del Sur",
  description: "Consulta nuestras convocatorias abiertas para voluntariados, pasantías y oportunidades de participación. Únete a nuestro equipo y forma parte del cambio.",
  openGraph: {
    title: "Convocatorias - Estrella del Sur",
    description: "Consulta nuestras convocatorias abiertas para voluntariados, pasantías y oportunidades de participación.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convocatorias - Estrella del Sur",
    description: "Consulta nuestras convocatorias abiertas para voluntariados, pasantías y oportunidades de participación.",
  },
};

export default function ConvocatoriasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

