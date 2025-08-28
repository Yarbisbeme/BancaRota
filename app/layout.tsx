import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "../styles/globals.css";
import Logo from "@/components/Logo";


const inter = Inter({
  variable: "--font-intern",
  subsets: ["latin"],
})

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-intern",
  weight: ["400", "700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "BancaRota",
  description: "BancaRota - Tu aliado en la recuperación financiera.",
  icons: {
    icon: "/icons/logo.svg"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${ibmPlexSerif.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
