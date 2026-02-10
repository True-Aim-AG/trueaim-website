import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: {
      ...(await import(`../../messages/${locale}/common.json`)).default,
      ...(await import(`../../messages/${locale}/home.json`)).default,
      ...(await import(`../../messages/${locale}/products.json`)).default,
      ...(await import(`../../messages/${locale}/company.json`)).default,
      ...(await import(`../../messages/${locale}/technology.json`)).default,
      ...(await import(`../../messages/${locale}/contact.json`)).default,
      ...(await import(`../../messages/${locale}/trust.json`)).default,
      ...(await import(`../../messages/${locale}/impact.json`)).default,
      ...(await import(`../../messages/${locale}/caseStudies.json`)).default,
      ...(await import(`../../messages/${locale}/partners.json`)).default,
      ...(await import(`../../messages/${locale}/claimEvalB.json`)).default,
      ...(await import(`../../messages/${locale}/metadata.json`)).default,
    }
  };
});
