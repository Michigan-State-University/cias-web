import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { render, screen } from '@testing-library/react';
import { DEFAULT_LOCALE } from 'i18n';

import { initialState } from 'global/reducers/globalState';
import { createTestStore } from 'utils/testUtils/storeUtils';

import { FileList } from '../index';

describe('<FileList />', () => {
  let store;
  beforeAll(() => {
    store = createTestStore(initialState);
  });

  const testFileInfos = [
    { id: 'id#1', name: 'test.txt', url: 'https://testurl.pl' },
    { id: 'id#2', name: 'img.jpg', url: 'https://testurl1.pl' },
    { id: 'id#3', name: 'testcsv.csv', url: 'https://testurl2.pl' },
  ];

  it('Should render correct amount of files & correct file information', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <FileList files={testFileInfos} handleDelete={null} />
        </IntlProvider>
      </Provider>,
    );

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(testFileInfos.length);

    const fileNameParagraphs = testFileInfos.map((fileInfo) =>
      screen.getByText(fileInfo.name),
    );
    expect(fileNameParagraphs).toBeTruthy();
  });
});
