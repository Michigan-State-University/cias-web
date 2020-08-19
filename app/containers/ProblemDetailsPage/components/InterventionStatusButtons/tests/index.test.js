/**
 *
 * Tests for InterventionStatusButtons
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';
import { DEFAULT_LOCALE } from 'i18n';
import renderer from 'react-test-renderer';

import InterventionStatusButtons from '../index';

const statuses = ['draft', 'published', 'closed'];

describe('<InterventionStatusButtons />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <InterventionStatusButtons />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    statuses.forEach(status => {
      const renderedComponent = renderer.create(
        <IntlProvider locale={DEFAULT_LOCALE}>
          <InterventionStatusButtons status={status} />
        </IntlProvider>,
      );
      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
