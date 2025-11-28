import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recursos - Estrella del Sur",
  description: "Explora nuestro centro multimedia, publicaciones, guías descargables, videos, audios y biblioteca digital. Recursos educativos y materiales de apoyo para la comunidad.",
  openGraph: {
    title: "Recursos - Estrella del Sur",
    description: "Explora nuestro centro multimedia, publicaciones, guías descargables, videos, audios y biblioteca digital.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recursos - Estrella del Sur",
    description: "Explora nuestro centro multimedia, publicaciones, guías descargables, videos, audios y biblioteca digital.",
  },
};

export default function RecursosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

