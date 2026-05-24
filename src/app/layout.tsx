import type { Metadata } from "next";
import { Anton, Archivo_Narrow, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { TournamentProvider } from "@/components/TournamentContext";
import GlobalFooter from "@/components/GlobalFooter";

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
});

const archivoNarrow = Archivo_Narrow({
  subsets: ['latin'],
  variable: '--font-archivo-narrow',
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken-grotesk',
});

export const metadata: Metadata = {
  title: "KYC Super League",
  description: "Live Data Performance System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body className={`${anton.variable} ${archivoNarrow.variable} ${hankenGrotesk.variable}`}>
        <TournamentProvider>
          <Navigation />
          {children}
          <GlobalFooter />
        </TournamentProvider>
      </body>
    </html>
  );
}
