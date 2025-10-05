import { cookies } from 'next/headers';
import { en } from './locales/en';
import { es } from './locales/es';

export async function getTranslations() {
  const cookieStore = (await cookies()).get('NEXT_LOCALE')?.value;
  const langCookie = cookieStore;
  if (langCookie === 'en') {
    return en;
  }

  return es;
}