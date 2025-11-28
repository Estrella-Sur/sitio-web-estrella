import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Noticias y Eventos - Estrella del Sur",
  description: "Mantente informado sobre nuestras últimas noticias, eventos, actividades y logros. Descubre lo que estamos haciendo para transformar vidas en Oruro.",
  openGraph: {
    title: "Noticias y Eventos - Estrella del Sur",
    description: "Mantente informado sobre nuestras últimas noticias, eventos, actividades y logros.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noticias y Eventos - Estrella del Sur",
    description: "Mantente informado sobre nuestras últimas noticias, eventos, actividades y logros.",
  },
};

export default function NoticiasEventosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

