import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciativas - Estrella del Sur",
  description: "Explora nuestras iniciativas y metodologías de trabajo. Conoce cómo desarrollamos soluciones innovadoras para los desafíos sociales en Oruro.",
  openGraph: {
    title: "Iniciativas - Estrella del Sur",
    description: "Explora nuestras iniciativas y metodologías de trabajo para el desarrollo social.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iniciativas - Estrella del Sur",
    description: "Explora nuestras iniciativas y metodologías de trabajo para el desarrollo social.",
  },
};

export default function IniciativasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

