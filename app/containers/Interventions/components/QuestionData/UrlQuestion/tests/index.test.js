import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { QuestionUrlWithIntl as UrlQuestion } from '../index';

const defaultProps = {
  updateUrl: jest.fn(),
  selectedQuestion: {
    body: {
      variable: { name: '' },
      data: [{ payload: 'www.google.com' }],
    },
  },
};

describe('<UrlQuestion />', () => {
  it('should match the snapshot', () => {
    const {
      container: { firstChild: renderedComponent },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <UrlQuestion {...defaultProps} />
      </IntlProvider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
