/**
 *
 * Tests for ChartValiditySettings
 *
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';

import { DEFAULT_LOCALE } from 'i18n';
import { formatMessage } from 'utils/testUtils/formatMessage';
import { intlProviderConfig } from 'containers/AppLanguageProvider';

import {
  ChartStatus,
  StatusPermissions,
} from 'global/reducers/dashboardSections';

import ChartValiditySettings from '../ChartValiditySettings';
import { ChartSettingsContext } from '../../constants';
import messages from '../../messages';

describe('<ChartValiditySettings />', () => {
  const defaultProps = {
    formulaVariableCount: 9,
    minAnsweredVariables: 9,
    positiveDespiteMissingData: false,
    onEditMinAnsweredVariables: jest.fn(),
    onEditPositiveDespiteMissingData: jest.fn(),
  };

  // mirrors the app-level provider — the labels use <b>, which only formats
  // with `defaultRichTextElements`
  const renderComponent = (props = {}, status = ChartStatus.DRAFT) =>
    render(
      <IntlProvider locale={DEFAULT_LOCALE} {...intlProviderConfig}>
        <ChartSettingsContext.Provider
          value={{ statusPermissions: StatusPermissions(status) }}
        >
          <ChartValiditySettings {...defaultProps} {...props} />
        </ChartSettingsContext.Provider>
      </IntlProvider>,
    );

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderComponent();
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('Should read M from formulaVariableCount', () => {
    const { getByText } = renderComponent({ formulaVariableCount: 7 });

    expect(
      getByText(
        formatMessage(messages.chartValidityMinAnsweredOutOf).replace(
          '{variableCount}',
          '7',
        ),
      ),
    ).toBeInTheDocument();
  });

  it('Should offer 0..M as the minimum options', () => {
    const { getByTestId, getAllByText, queryAllByText } = renderComponent({
      formulaVariableCount: 3,
      minAnsweredVariables: 0,
    });

    const select = getByTestId('min-answered-variables-select').querySelector(
      'input',
    );
    fireEvent.focus(select);
    fireEvent.keyDown(select, { key: 'ArrowDown', code: 40 });

    // 0 renders twice — as the selected value and as an option
    expect(getAllByText('0')).toHaveLength(2);
    ['1', '2', '3'].forEach((option) => {
      expect(getAllByText(option)).toHaveLength(1);
    });
    expect(queryAllByText('4')).toHaveLength(0);
  });

  it('Should pass the picked minimum up as a number', async () => {
    const { getByTestId, getByText } = renderComponent({
      formulaVariableCount: 3,
      minAnsweredVariables: 0,
    });

    const select = getByTestId('min-answered-variables-select').querySelector(
      'input',
    );
    fireEvent.focus(select);
    fireEvent.keyDown(select, { key: 'ArrowDown', code: 40 });
    fireEvent.click(getByText('2'));

    await waitFor(() =>
      expect(defaultProps.onEditMinAnsweredVariables).toHaveBeenCalledWith(2),
    );
  });

  it('Should render the stale-value notice when the minimum exceeds M', () => {
    const { getByText } = renderComponent({
      formulaVariableCount: 5,
      minAnsweredVariables: 9,
    });

    expect(
      getByText(/The minimum is set to 9, but the formula now has only 5/),
    ).toBeInTheDocument();
  });

  it('Should not render the stale-value notice when the minimum fits M', () => {
    const { queryByText } = renderComponent({
      formulaVariableCount: 9,
      minAnsweredVariables: 9,
    });

    expect(queryByText(/but the formula now has only/)).not.toBeInTheDocument();
  });

  it('Should pass checking the rescue checkbox up as true', async () => {
    const { getByTestId } = renderComponent({
      positiveDespiteMissingData: false,
    });

    fireEvent.click(getByTestId('positive-despite-missing-data-checkbox'));

    await waitFor(() =>
      expect(
        defaultProps.onEditPositiveDespiteMissingData,
      ).toHaveBeenCalledWith(true),
    );
  });

  it('Should pass unchecking the rescue checkbox up as false', async () => {
    const { getByTestId } = renderComponent({
      positiveDespiteMissingData: true,
    });

    fireEvent.click(getByTestId('positive-despite-missing-data-checkbox'));

    await waitFor(() =>
      expect(
        defaultProps.onEditPositiveDespiteMissingData,
      ).toHaveBeenCalledWith(false),
    );
  });

  it('Should render the checkbox checked when the rescue is on', () => {
    const { getByTestId } = renderComponent({
      positiveDespiteMissingData: true,
    });

    expect(getByTestId('positive-despite-missing-data-checkbox')).toBeChecked();
  });

  it('Should disable both inputs outside draft', () => {
    const { getByTestId } = renderComponent({}, ChartStatus.DATA_COLLECTION);

    expect(
      getByTestId('min-answered-variables-select').querySelector('input'),
    ).toBeDisabled();
    expect(
      getByTestId('positive-despite-missing-data-checkbox'),
    ).toBeDisabled();
  });

  it('Should disable both inputs when M is 0', () => {
    const { getByTestId } = renderComponent({
      formulaVariableCount: 0,
      minAnsweredVariables: 0,
    });

    expect(
      getByTestId('min-answered-variables-select').querySelector('input'),
    ).toBeDisabled();
    expect(
      getByTestId('positive-despite-missing-data-checkbox'),
    ).toBeDisabled();
  });

  it('Should disable both inputs when M is null (unparseable payload)', () => {
    const { getByTestId } = renderComponent({
      formulaVariableCount: null,
      minAnsweredVariables: null,
      positiveDespiteMissingData: false,
    });

    expect(
      getByTestId('min-answered-variables-select').querySelector('input'),
    ).toBeDisabled();
    expect(
      getByTestId('positive-despite-missing-data-checkbox'),
    ).toBeDisabled();
  });

  it('Should default a formula without the keys to 0 / unchecked', () => {
    const { getByTestId, getAllByText } = renderComponent({
      formulaVariableCount: 4,
      minAnsweredVariables: undefined,
      positiveDespiteMissingData: undefined,
    });

    expect(getAllByText('0').length).toBeGreaterThan(0);
    expect(
      getByTestId('positive-despite-missing-data-checkbox'),
    ).not.toBeChecked();
  });
});
