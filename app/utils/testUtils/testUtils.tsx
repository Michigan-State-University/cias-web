import React, { ComponentType, ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from 'i18n';

type Props = { children: JSX.Element };

const ProviderWrapper = ({ children }: Props): JSX.Element => (
  <IntlProvider locale={DEFAULT_LOCALE}>{children}</IntlProvider>
);

const testRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
): RenderResult =>
  render(ui, { wrapper: ProviderWrapper as ComponentType, ...options });

export { testRender };
