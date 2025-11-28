import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos - Estrella del Sur",
  description: "Conoce nuestros proyectos de desarrollo social y comunitario en Oruro. Descubre cómo trabajamos para mejorar la calidad de vida de las familias y comunidades.",
  openGraph: {
    title: "Proyectos - Estrella del Sur",
    description: "Conoce nuestros proyectos de desarrollo social y comunitario en Oruro.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyectos - Estrella del Sur",
    description: "Conoce nuestros proyectos de desarrollo social y comunitario en Oruro.",
  },
};

export default function ProyectosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

