import { Dictionary, Locale } from '@/types/i18n-types';
import en from './dictionaries/en';
import pt from './dictionaries/pt';

const dictionaries: Record<Locale, Dictionary> = {
  en,
  pt,
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale] || dictionaries.en;
}

export async function getDictionarySection<K extends keyof Dictionary>(
  locale: Locale,
  section: K,
): Promise<Dictionary[K]> {
  const dict = await getDictionary(locale);
  return dict[section];
}

export type DictionaryProps = {
  params: { lang: Locale };
};

export type DictionaryPageProps<T = Dictionary> = {
  params: { lang: Locale };
} & T;
