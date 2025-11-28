import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/lib/providers/query-provider";
import { AuthSessionProvider } from "@/lib/providers/session-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";

export const metadata: Metadata = {
  title: "Estrella del Sur - Transformando vidas en Oruro",
  description: "Organización sin fines de lucro dedicada al desarrollo social, educación y apoyo comunitario en Oruro, Bolivia. Conoce nuestros programas, proyectos y formas de colaborar.",
  keywords: ["Estrella del Sur", "ONG Oruro", "desarrollo social", "educación", "ayuda comunitaria", "Bolivia", "organización sin fines de lucro"],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Estrella del Sur - Transformando vidas en Oruro",
    description: "Organización sin fines de lucro dedicada al desarrollo social, educación y apoyo comunitario en Oruro, Bolivia.",
    type: "website",
    locale: "es_BO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estrella del Sur - Transformando vidas en Oruro",
    description: "Organización sin fines de lucro dedicada al desarrollo social, educación y apoyo comunitario en Oruro, Bolivia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional" rel="stylesheet" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Special+Gothic+Condensed:wght@400;700&display=optional" rel="stylesheet" />
        {/* Poppins SemiBold como fallback para Avant Garde Demi */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=optional" rel="stylesheet" />
        {/* Century Gothic no está disponible en Google Fonts, usaremos Helvetica Neue como fallback */}
      </head>
      <body
        className={`font-sans antialiased bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark`}
      >
        <AuthSessionProvider>
          <QueryProvider>
            {children}
            <Toaster />
            <SonnerToaster />
          </QueryProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
