import { createElement, forwardRef, type ComponentProps } from 'react';
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';
import { pageLocales } from './page-locales';

const navigation = createNavigation(routing);

export const { redirect, usePathname, useRouter, getPathname } = navigation;

type LinkProps = ComponentProps<typeof navigation.Link>;

/**
 * Locale-aware link. A link to an English-only page always goes to its /en/ URL,
 * so German, French and Italian pages never link to a page that does not exist.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const path = typeof props.href === 'string' ? props.href : props.href.pathname ?? '';
  const locale = props.locale ?? (pageLocales(path).length === 1 ? 'en' : undefined);
  return createElement(navigation.Link, { ...props, locale, ref });
});
