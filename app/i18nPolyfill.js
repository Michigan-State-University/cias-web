/**
 * i18nPolyfill.js
 *
 * This will load polyfills if necessary.
 * Dependency tree: https://formatjs.io/docs/polyfills/
 */

import { shouldPolyfill as shouldPolyfillGetCanonicalLocales } from '@formatjs/intl-getcanonicallocales/should-polyfill';
import { shouldPolyfill as shouldPolyfillLocale } from '@formatjs/intl-locale/should-polyfill';
import { shouldPolyfill as shouldPolyfillDisplayNames } from '@formatjs/intl-displaynames/should-polyfill';
import { shouldPolyfill as shouldPolyfillListFormat } from '@formatjs/intl-listformat/should-polyfill';
import { shouldPolyfill as shouldPolyfillPluralRules } from '@formatjs/intl-pluralrules/should-polyfill';
import { shouldPolyfill as shouldPolyfillNumberFormat } from '@formatjs/intl-numberformat/should-polyfill';
import { shouldPolyfill as shouldPolyfillDateTimeFormat } from '@formatjs/intl-datetimeformat/should-polyfill';
import { shouldPolyfill as shouldPolyfillRelativeTimeFormat } from '@formatjs/intl-relativetimeformat/should-polyfill';

const polyfillIntl = async () => {
  if (!window.Intl) {
    await import('intl');

    // ! Add every used language
    await import('intl/locale-data/jsonp/en.js');
    await import('intl/locale-data/jsonp/ar.js');
    await import('intl/locale-data/jsonp/es.js');
  }
};

const polyfillGetCanonicalLocales = async () => {
  if (shouldPolyfillGetCanonicalLocales())
    await import('@formatjs/intl-getcanonicallocales/polyfill');
};

const polyfillLocale = async () => {
  if (shouldPolyfillLocale()) await import('@formatjs/intl-locale/polyfill');
};

const polyfillListFormat = async () => {
  if (shouldPolyfillListFormat())
    await import('@formatjs/intl-listformat/polyfill');

  if (Intl.ListFormat.polyfilled) {
    // ! Add every used language
    await import('@formatjs/intl-listformat/locale-data/en');
    await import('@formatjs/intl-listformat/locale-data/ar');
    await import('@formatjs/intl-listformat/locale-data/es');
  }
};

const polyfillDisplayNames = async () => {
  if (shouldPolyfillDisplayNames())
    await import('@formatjs/intl-displaynames/polyfill');

  if (Intl.DisplayNames.polyfilled) {
    // ! Add every used language
    await import('@formatjs/intl-displaynames/locale-data/en');
    await import('@formatjs/intl-displaynames/locale-data/ar');
    await import('@formatjs/intl-displaynames/locale-data/es');
  }
};

const polyfillPluralRules = async () => {
  if (shouldPolyfillPluralRules())
    await import('@formatjs/intl-pluralrules/polyfill');

  if (Intl.PluralRules.polyfilled) {
    // ! Add every used language
    await import('@formatjs/intl-pluralrules/locale-data/en');
    await import('@formatjs/intl-pluralrules/locale-data/ar');
    await import('@formatjs/intl-pluralrules/locale-data/es');
  }
};

const polyfillNumberFormat = async () => {
  if (shouldPolyfillNumberFormat())
    await import('@formatjs/intl-numberformat/polyfill');

  if (Intl.NumberFormat.polyfilled) {
    // ! Add every used language
    await import('@formatjs/intl-numberformat/locale-data/en');
    await import('@formatjs/intl-numberformat/locale-data/ar');
    await import('@formatjs/intl-numberformat/locale-data/es');
  }
};

const polyfillRelativeTimeFormat = async () => {
  if (shouldPolyfillRelativeTimeFormat())
    await import('@formatjs/intl-relativetimeformat/polyfill');

  if (Intl.RelativeTimeFormat.polyfilled) {
    // ! Add every used language
    await import('@formatjs/intl-relativetimeformat/locale-data/en');
    await import('@formatjs/intl-relativetimeformat/locale-data/ar');
    await import('@formatjs/intl-relativetimeformat/locale-data/es');
  }
};

const polyfillDateTimeFormat = async () => {
  if (shouldPolyfillDateTimeFormat())
    await import('@formatjs/intl-datetimeformat/polyfill');

  if (Intl.DateTimeFormat.polyfilled) {
    // Parallelize loading
    const dataPolyfills = [import('@formatjs/intl-datetimeformat/add-all-tz')];

    // ! Add every used language
    dataPolyfills.push(import('@formatjs/intl-datetimeformat/locale-data/en'));
    dataPolyfills.push(import('@formatjs/intl-datetimeformat/locale-data/ar'));
    dataPolyfills.push(import('@formatjs/intl-datetimeformat/locale-data/es'));

    await Promise.all(dataPolyfills);
  }
};

/**
 * @returns {Promise<void>} Promise which loads necessary Polyfills for Browser's Native `Intl` API
 */
export const polyfillI18n = async () => {
  await polyfillIntl();

  await polyfillGetCanonicalLocales();

  await polyfillLocale();

  // Parallelize not related polyfills
  await Promise.all([
    polyfillListFormat(),
    polyfillDisplayNames(),
    polyfillPluralRules(),
  ]);

  await polyfillNumberFormat();

  // Parallelize not related polyfills
  await Promise.all([polyfillRelativeTimeFormat(), polyfillDateTimeFormat()]);
};
