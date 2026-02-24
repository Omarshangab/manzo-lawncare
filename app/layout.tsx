import type { Metadata, Viewport } from "next";
import { Raleway, Merriweather } from "next/font/google";
import "./globals.css";
import MadeByOrganiq from "./components/MadeByOrganiq";
import { LanguageProvider } from "./context/LanguageContext";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manzo's Lawn Care",
  description: "Professional lawn care services",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#3C872B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${raleway.variable} ${merriweather.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
          <MadeByOrganiq />
        </LanguageProvider>
      </body>
    </html>
  );
}
