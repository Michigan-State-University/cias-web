/**
 *
 * Tests for ConfirmationBox
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';

import { DEFAULT_LOCALE } from 'i18n';

import ConfirmationModal from '../ConfirmationModal';

describe('<ConfirmationModal />', () => {
  const defaultProps = {
    title: 'Test',
    visible: true,
    onClose: jest.fn(),
    confirmAction: jest.fn(),
    loading: false,
    error: null,
  };
  let modalContainer;
  let mainAppContainer;
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element) => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);

    mainAppContainer = document.createElement('div');
    mainAppContainer.setAttribute('id', 'main-app-container');
    document.body.appendChild(mainAppContainer);
  });
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ConfirmationModal {...defaultProps} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ConfirmationModal {...defaultProps} />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render error and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ConfirmationModal {...defaultProps} error={['Error']} />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
