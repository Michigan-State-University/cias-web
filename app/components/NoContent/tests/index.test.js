import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';

import { DEFAULT_LOCALE } from 'i18n';

import NoContent from '../index';

describe('<NoContent />', () => {
  it('should match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <NoContent />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
