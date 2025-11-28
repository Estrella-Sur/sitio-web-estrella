import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transparencia - Estrella del Sur",
  description: "Accede a nuestros informes anuales, reportes de auditoría y documentos de rendición de cuentas. Estrella del Sur se compromete con la transparencia y la rendición de cuentas.",
  openGraph: {
    title: "Transparencia - Estrella del Sur",
    description: "Accede a nuestros informes anuales, reportes de auditoría y documentos de rendición de cuentas.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transparencia - Estrella del Sur",
    description: "Accede a nuestros informes anuales, reportes de auditoría y documentos de rendición de cuentas.",
  },
};

export default function TransparenciaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

