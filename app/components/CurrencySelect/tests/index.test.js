import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';

import CurrencySelect from '../index';

describe('<CurrencySelect />', () => {
  it('should match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <CurrencySelect />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
