/**
 *
 * Tests for ChartSettingsTopSection
 *
 */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';

import { DEFAULT_LOCALE } from 'i18n';
import { formatMessage } from 'utils/testUtils/formatMessage';
import { intlProviderConfig } from 'containers/AppLanguageProvider';

import {
  ChartStatus,
  StatusPermissions,
} from 'global/reducers/dashboardSections';

import { MODAL_PORTAL_ID } from 'containers/App/constants';

import ChartSettingsTopSection from '../ChartSettingsTopSection';
import { ChartSettingsContext } from '../../constants';
import messages from '../../messages';

const CONFIRM_BUTTON_SELECTOR = '[data-cy="confirmation-box-confirm-button"]';

describe('<ChartSettingsTopSection />', () => {
  const defaultProps = {
    chartStatus: ChartStatus.DATA_COLLECTION,
    chartType: 'bar_chart',
    isChangingStatus: false,
    isDeleting: false,
    onChangeStatus: jest.fn(),
    onDelete: jest.fn(),
    hasFormula: true,
    isMinAnsweredStale: false,
    onCopyChart: jest.fn(),
    onRegenerateChart: jest.fn(),
    isRegenerating: false,
    isEnqueuingRegeneration: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // the confirmation modal renders through a portal - without its target the
    // modal silently renders nothing
    const portal = document.createElement('div');
    portal.setAttribute('id', MODAL_PORTAL_ID);
    document.body.appendChild(portal);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  const renderComponent = (props = {}) =>
    render(
      <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
        <ChartSettingsContext.Provider
          value={{
            statusPermissions: StatusPermissions(
              props.chartStatus ?? defaultProps.chartStatus,
            ),
          }}
        >
          <ChartSettingsTopSection {...defaultProps} {...props} />
        </ChartSettingsContext.Provider>
      </IntlProvider>,
    );

  const regenerateButton = () =>
    screen
      .getByText(formatMessage(messages.chartSettingsRegenerate))
      .closest('button');

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderComponent();
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render the regenerate button enabled for an idle chart', () => {
    renderComponent();

    expect(regenerateButton()).toBeInTheDocument();
    expect(regenerateButton()).not.toBeDisabled();
  });

  it('Should disable the regenerate button while the chart reports in progress', () => {
    renderComponent({ isRegenerating: true });

    expect(regenerateButton()).toBeDisabled();
  });

  it('Should not dispatch regeneration straight off the click', () => {
    renderComponent();

    fireEvent.click(regenerateButton());

    expect(defaultProps.onRegenerateChart).not.toHaveBeenCalled();
    expect(
      screen.getByText(formatMessage(messages.regenerateChartModalHeader)),
    ).toBeInTheDocument();
  });

  it('Should dispatch regeneration once the confirmation is accepted', () => {
    const { baseElement } = renderComponent();

    fireEvent.click(regenerateButton());
    fireEvent.click(baseElement.querySelector(CONFIRM_BUTTON_SELECTOR));

    expect(defaultProps.onRegenerateChart).toHaveBeenCalledTimes(1);
  });

  it('Should not open the confirmation while the chart reports in progress', () => {
    renderComponent({ isRegenerating: true });

    fireEvent.click(regenerateButton());

    expect(
      screen.queryByText(formatMessage(messages.regenerateChartModalHeader)),
    ).not.toBeInTheDocument();
    expect(defaultProps.onRegenerateChart).not.toHaveBeenCalled();
  });
});
