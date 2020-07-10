/**
 *
 * Tests for SingleInterventionPanel
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';

import SingleInterventionPanel from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<SingleInterventionPanel />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <SingleInterventionPanel />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <SingleInterventionPanel />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
