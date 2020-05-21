import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import BaseEditableIntervention from '../index';

describe('<BaseEditableIntervention />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <IntlProvider locale={DEFAULT_LOCALE}>
          <BaseEditableIntervention />
        </IntlProvider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
