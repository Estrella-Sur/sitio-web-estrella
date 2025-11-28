import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programas - Estrella del Sur",
  description: "Descubre nuestros programas de educación, desarrollo comunitario y apoyo social. Programas diseñados para generar impacto positivo y sostenible en Oruro.",
  openGraph: {
    title: "Programas - Estrella del Sur",
    description: "Descubre nuestros programas de educación, desarrollo comunitario y apoyo social.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Programas - Estrella del Sur",
    description: "Descubre nuestros programas de educación, desarrollo comunitario y apoyo social.",
  },
};

export default function ProgramasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

