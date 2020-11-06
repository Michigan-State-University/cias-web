import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Provider } from 'react-redux';

import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { createStore } from 'redux';
import VariableChooser from '../index';

describe('<VariableChooser />', () => {
  let store;
  const reducer = state => state;
  const initialState = {
    questions: {
      questions: [],
    },
  };

  const props = {
    onClick: jest.fn(),
  };

  beforeAll(() => {
    store = createStore(reducer, initialState);
    store.runSaga = () => {};
    store.injectedReducers = {};
    store.injectedSagas = {};
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
    store = createStore(reducer, {
      questions: {
        questions: [mockSingleQuestion()],
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
    store = createStore(reducer, {
      questions: {
        questions: [mockSingleQuestion(1, false)],
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
    const question = mockSingleQuestion(1, true);

    store = createStore(reducer, {
      questions: {
        questions: [question],
        selectedQuestion: question.id,
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
    const question = mockSingleQuestion(1, true);

    store = createStore(reducer, {
      questions: {
        questions: [question],
        selectedQuestion: question.id,
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

const mockSingleQuestion = (suffix = 1, hasVariable = true) => ({
  id: `test-id-${suffix}`,
  title: `Test title ${suffix}`,
  subtitle: `Test subtitle ${suffix}`,
  type: 'Question::Single',
  body: {
    variable: { name: hasVariable ? `var_single_${suffix}` : '' },
  },
});
