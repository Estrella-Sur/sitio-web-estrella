import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donar - Estrella del Sur",
  description: "Únete a nuestra causa y apoya nuestros proyectos de desarrollo social en Oruro. Conoce nuestros proyectos de donación y contribuye a transformar vidas en la comunidad.",
  openGraph: {
    title: "Donar - Estrella del Sur",
    description: "Únete a nuestra causa y apoya nuestros proyectos de desarrollo social en Oruro. Conoce nuestros proyectos de donación y contribuye a transformar vidas.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Donar - Estrella del Sur",
    description: "Únete a nuestra causa y apoya nuestros proyectos de desarrollo social en Oruro.",
  },
};

export default function DonarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

