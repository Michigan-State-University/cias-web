/**
 *
 * Tests for UrlPreview
 *
 */

import React from 'react';
import 'jest-styled-components';
import { render, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from 'i18n';

import { useUrlMetadata } from 'utils/useUrlMetadata';

import UrlPreview from '../index';

describe('<UrlPreview />', () => {
  const url = 'test-url';
  const props = { link: url };
  const testResponse = {
    url,
    title: 'Test',
    siteName: 'Test',
    description: 'Test site - mock data',
    images: ['image1.png'],
    mediaType: 'image.other',
    contentType: 'text/html; charset=utf-8',
    videos: [],
    favicons: ['favicon1.ico'],
  };

  beforeAll(() => {
    useUrlMetadata.mockImplementationOnce(() => ({
      metadata: testResponse,
      isFetching: false,
    }));
  });

  it('Should render and match the snapshot', async () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <UrlPreview {...props} />
      </IntlProvider>,
    );

    expect(container).toMatchSnapshot();
    await waitFor(() => expect(useUrlMetadata).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(useUrlMetadata).toHaveBeenCalledWith(url));
  });
});
