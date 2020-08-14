/**
 *
 * Tests for InterventionCreateButton
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';
import { render } from 'react-testing-library';
import { DEFAULT_LOCALE } from 'i18n';
import renderer from 'react-test-renderer';

import InterventionCreateButton from '../index';

describe('<InterventionCreateButton />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <InterventionCreateButton />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <IntlProvider locale={DEFAULT_LOCALE}>
          <InterventionCreateButton />
        </IntlProvider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
