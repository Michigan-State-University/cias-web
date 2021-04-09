import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Provider } from 'react-redux';

import { createTestStore } from 'utils/testUtils/storeUtils';
import { initialState } from 'global/reducers/globalState';

import { Button } from 'components/Button';

import FileDownload from '../index';

describe('<FileDownload />', () => {
  let store;

  beforeAll(() => {
    store = createTestStore({ globalState: initialState });
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <FileDownload url="test">
          {({ isDownloading }) => <Button loading={isDownloading}>test</Button>}
        </FileDownload>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <FileDownload url="test">
          {({ isDownloading }) => <Button loading={isDownloading}>test</Button>}
        </FileDownload>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
