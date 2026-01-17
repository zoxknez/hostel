import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hostel Downtown Inn - Belgrade",
  description: "Modern hostel in the heart of Belgrade with stunning views, comfortable rooms, and unbeatable location. Book your stay today!",
  keywords: ["hostel Belgrade", "downtown hostel", "Belgrade accommodation", "budget travel Belgrade", "hostel inn"],
  authors: [{ name: "Hostel Downtown Inn" }],
  openGraph: {
    type: "website",
    title: "Hostel Downtown Inn Belgrade",
    description: "Modern hostel in the heart of Belgrade with stunning panoramic views",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased bg-primary text-white font-body">
        {children}
      </body>
    </html>
  );
}
