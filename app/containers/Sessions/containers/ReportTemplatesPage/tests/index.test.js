import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';
import createModalForTests from 'utils/createModalForTests';
import { initialState as initialData } from 'global/reducers/reportTemplates';
import { ReportTemplateBuilder } from 'models/ReportTemplate';
import ReportTemplatesPage from '../index';

describe('<ReportTemplatesPage />', () => {
  beforeEach(() => {
    createModalForTests();
  });
  const defaultProps = {
    match: { params: { id: '12ad120dj012-3a' } },
    getSession: jest.fn(),
    editSession: jest.fn(),
    getQuestions: jest.fn(),
  };

  const initialState = {
    reportTemplates: {
      ...initialData,
      reportTemplates: [
        new ReportTemplateBuilder()
          .withId('report-template-1')
          .withName('Report Template 1')
          .build(),
        new ReportTemplateBuilder()
          .withId('report-template-2')
          .withName('Report Template 2')
          .build(),
      ],
    },
  };
  const store = createTestStore(initialState);

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <ReportTemplatesPage {...defaultProps} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <ReportTemplatesPage {...defaultProps} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
