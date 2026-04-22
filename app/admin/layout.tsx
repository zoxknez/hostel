import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import '../globals.css';
import AdminLayoutClient from "./AdminLayoutClient";

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
  title: "Admin Panel | Hostel Downtown Inn",
  description: "Administrative dashboard for Hostel Downtown Inn.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
            <body className="antialiased bg-primary text-white font-body">
                <AdminLayoutClient>
                    {children}
                </AdminLayoutClient>
            </body>
        </html>
    );
}
