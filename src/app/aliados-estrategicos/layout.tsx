import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aliados Estratégicos - Estrella del Sur",
  description: "Conoce nuestras alianzas estratégicas con organizaciones, empresas e instituciones que comparten nuestra visión de desarrollo social y comunitario en Oruro.",
  openGraph: {
    title: "Aliados Estratégicos - Estrella del Sur",
    description: "Conoce nuestras alianzas estratégicas con organizaciones, empresas e instituciones.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aliados Estratégicos - Estrella del Sur",
    description: "Conoce nuestras alianzas estratégicas con organizaciones, empresas e instituciones.",
  },
};

export default function AliadosEstrategicosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

