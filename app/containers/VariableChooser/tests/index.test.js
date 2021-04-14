import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';

import VariableChooser from '../index';

describe('<VariableChooser />', () => {
  let store;

  const initialState = {
    copyModal: {
      questionGroups: [],
    },
  };

  const props = {
    onClick: jest.fn(),
    includeAllVariables: true,
  };

  beforeAll(() => {
    store = createTestStore(initialState);
  });

  it('should match the snapshot without variables', () => {
    const renderedComponent = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <VariableChooser {...props} />
        </IntlProvider>
      </Provider>,
    );

    expect(renderedComponent).toMatchSnapshot();
  });

  it('should contain <NoContent /> when without variables', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <VariableChooser {...props} />
        </IntlProvider>
      </Provider>,
    );

    const noContentComponent = getByTestId('no-content');

    expect(noContentComponent).not.toEqual(null);
  });

  it('should not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <VariableChooser {...props} />
        </IntlProvider>
      </Provider>,
    );

    expect(spy).not.toHaveBeenCalled();
  });

  it('should match the snapshot with variables', () => {
    store = createTestStore({
      copyModal: {
        questionGroups: [mockGroup(1, [mockSingleQuestion()])],
      },
    });

    const renderedComponent = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <VariableChooser {...props} />
        </IntlProvider>
      </Provider>,
    );

    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render <NoContent /> when all variables are empty strings', () => {
    store = createTestStore({
      copyModal: {
        questionGroups: [mockGroup(1, [mockSingleQuestion(1, false)])],
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <VariableChooser {...props} />
        </IntlProvider>
      </Provider>,
    );

    const noContentComponent = getByTestId('no-content');

    expect(noContentComponent).not.toEqual(null);
  });

  it('should render list of variables', () => {
    const question = mockSingleQuestion(1, true, mockGroup(1).id);
    const group = mockGroup(1, [question]);

    store = createTestStore({
      copyModal: {
        questionGroups: [group],
      },
    });

    const { getAllByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <VariableChooser {...props} />
        </IntlProvider>
      </Provider>,
    );

    const variableComponentList = getAllByTestId(
      `${question.id}-select-variable`,
    );

    expect(variableComponentList).toHaveLength(1);
  });

  it('should invoke onClick', () => {
    const question = mockSingleQuestion(1, true, mockGroup(1).id);
    const group = mockGroup(1, [question]);

    store = createTestStore({
      copyModal: {
        questionGroups: [group],
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <VariableChooser {...props} />
        </IntlProvider>
      </Provider>,
    );
    const row = getByText(`Test subtitle 1`);
    fireEvent.click(row);
    expect(props.onClick).toHaveBeenCalledWith('var_single_1');
  });
});

const mockGroup = (suffix = 1, questions = []) => ({
  id: `test-group-id-${suffix}`,
  title: `Test group title ${suffix}`,
  type: 'QuestionGroup::Plain',
  position: 0,
  questions,
});

const mockSingleQuestion = (suffix = 1, hasVariable = true, groupId) => ({
  id: `test-id-${suffix}`,
  title: `Test title ${suffix}`,
  subtitle: `Test subtitle ${suffix}`,
  type: 'Question::Single',
  questionGroupId: groupId,
  body: {
    variable: { name: hasVariable ? `var_single_${suffix}` : '' },
  },
  position: 0,
});
