'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '../i18n/routing';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={handleLanguageChange}
        disabled={isPending}
        className="appearance-none bg-white/[0.035] border border-white/10 text-white text-xs font-semibold uppercase tracking-widest pl-3 pr-8 py-2 rounded-full cursor-pointer hover:border-[#39ff14]/30 transition-colors focus:outline-none focus:ring-1 focus:ring-[#39ff14]/50 disabled:opacity-50"
      >
        <option value="en" className="bg-[#050816] text-white">EN</option>
        <option value="sr" className="bg-[#050816] text-white">SR</option>
        <option value="de" className="bg-[#050816] text-white">DE</option>
        <option value="ru" className="bg-[#050816] text-white">RU</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#39ff14]">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
