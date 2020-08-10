/**
 *
 * Tests for CopyToClipboard
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';

import CopyToClipboard from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

const defaultProps = {
  textToCopy: 'text to copy',
};

describe('<CopyToClipboard />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <CopyToClipboard {...defaultProps}>Copy</CopyToClipboard>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <CopyToClipboard {...defaultProps}>Copy</CopyToClipboard>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
