import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';

import { MSULogo } from '../index';

describe('<MSULogo />', () => {
  it('should match the snapshot', () => {
    const {
      container: { firstChild: renderedComponent },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MSULogo />
      </IntlProvider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
