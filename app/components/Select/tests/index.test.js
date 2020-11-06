/**
 *
 * Tests for Select
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';

import { DEFAULT_LOCALE } from 'i18n';
import Select from '../index';

const defaultProps = {
  selectProps: {
    placeholder: 'Placeholder',
    value: { value: 'Value', label: 'Value' },
    onChange: jest.fn(),
  },
};

describe('<Select />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Select {...defaultProps} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Select {...defaultProps} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
