import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - Estrella del Sur",
  description: "Escríbenos o Visítanos si te interesa conocer más sobre Estrella del Sur, nuestros objetivos y explorar formas de colaborar o compartir tus ideas con nosotros.",
  openGraph: {
    title: "Conecta con Nosotros - Estrella del Sur",
    description: "Escríbenos o Visítanos si te interesa conocer más sobre Estrella del Sur, nuestros objetivos y explorar formas de colaborar o compartir tus ideas con nosotros.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conecta con Nosotros - Estrella del Sur",
    description: "Escríbenos o Visítanos si te interesa conocer más sobre Estrella del Sur, nuestros objetivos y explorar formas de colaborar o compartir tus ideas con nosotros.",
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

