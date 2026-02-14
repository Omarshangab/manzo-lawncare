import type { Metadata } from "next";
import { Raleway, Merriweather } from "next/font/google";
import "./globals.css";

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
  themeColor: "#3C872B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${merriweather.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
