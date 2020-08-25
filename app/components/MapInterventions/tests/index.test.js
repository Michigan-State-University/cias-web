import React from 'react';
import 'jest-styled-components';
import { browserHistory, MemoryRouter } from 'react-router-dom';

import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import MapInterventions from 'components/MapInterventions/MapInterventions';
import { DEFAULT_LOCALE } from 'i18n';
import configureStore from 'configureStore';
import { Provider } from 'react-redux';

describe('<MapInterventions />', () => {
  const mockInterventions = [
    {
      id: 1,
      name: 'Intervention 1',
      status: 'published',
      problem_id: 'asd12d',
    },
    {
      id: 2,
      name: 'Intervention 2',
      status: 'draft',
      problem_id: 'asdj12dsa',
    },
  ];
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <MapInterventions interventions={mockInterventions} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
