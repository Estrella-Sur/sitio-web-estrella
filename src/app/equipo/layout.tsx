import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipo - Estrella del Sur",
  description: "Conoce al equipo de profesionales y voluntarios que hacen posible el trabajo de Estrella del Sur. Personas comprometidas con el desarrollo social en Oruro.",
  openGraph: {
    title: "Equipo - Estrella del Sur",
    description: "Conoce al equipo de profesionales y voluntarios que hacen posible el trabajo de Estrella del Sur.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Equipo - Estrella del Sur",
    description: "Conoce al equipo de profesionales y voluntarios que hacen posible el trabajo de Estrella del Sur.",
  },
};

export default function EquipoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

