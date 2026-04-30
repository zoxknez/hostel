import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "../globals.css";

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

import { getTranslations } from 'next-intl/server';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL('https://www.hostelinn.rs'),
    title: t('title'),
    description: t('description'),
    keywords: ["hostel Belgrade", "downtown hostel", "Belgrade accommodation", "budget travel Belgrade", "hostel inn"],
    authors: [{ name: "Hostel Downtown Inn" }],
    openGraph: {
      type: "website",
      siteName: "Hostel Downtown Inn",
      url: "/",
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: "/logo.png",
          width: 512,
          height: 512,
          alt: "Hostel Downtown Inn logo",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: t('title'),
      description: t('description'),
      images: ["/logo.png"],
    },
  };
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';

type Locale = (typeof routing.locales)[number];

function isLocale(locale: string): locale is Locale {
  return routing.locales.includes(locale as Locale);
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-primary text-white font-body">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
