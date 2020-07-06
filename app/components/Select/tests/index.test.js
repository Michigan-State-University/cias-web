/**
 *
 * Tests for Select
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';

import Select from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

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
