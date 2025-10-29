import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Fira_Code, Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-nunito',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-fira-code',
});

export const metadata: Metadata = {
  title: "Web Universe",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${firaCode.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
