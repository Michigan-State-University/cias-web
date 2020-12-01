/**
 *
 * Tests for InterventionStatusButtons
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';
import { DEFAULT_LOCALE } from 'i18n';

import InterventionStatusButtons from '../index';

const statuses = ['draft', 'published', 'closed'];

describe('<InterventionStatusButtons />', () => {
  let modalContainer;
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn(element => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);
  });
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
      const {
        container: { firstChild: renderedComponent },
      } = render(
        <IntlProvider locale={DEFAULT_LOCALE}>
          <InterventionStatusButtons status={status} />
        </IntlProvider>,
      );
      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
