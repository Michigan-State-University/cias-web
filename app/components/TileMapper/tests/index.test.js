import React from 'react';
import 'jest-styled-components';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';

import TileMapper from 'components/TileMapper/index';
import { createReport } from 'utils/reducerCreators';

describe('<TileMapper />', () => {
  const mockReports = [createReport()];

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <TileMapper
            items={mockReports}
            component={({ id, title }) => <h3 key={id}>{title}</h3>}
          />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <TileMapper
            items={mockReports}
            component={({ id, title }) => <h3 key={id}>{title}</h3>}
          />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render and match the snapshot - empty', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <TileMapper
            items={[]}
            component={({ id, title }) => <h3 key={id}>{title}</h3>}
          />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
