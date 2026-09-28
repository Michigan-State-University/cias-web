import React from 'react';
import { Provider } from 'react-redux';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from 'i18n';

import { GENERATE_TEST_LINK_REQUEST } from 'global/reducers/intervention/constants';

import { CopyTestLinkButton } from '../CopyTestLinkButton';

jest.mock('react-toastify', () => ({
  toast: { info: jest.fn(), error: jest.fn() },
}));

// eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
const { toast } = require('react-toastify');

const OWNER_ID = 'user-1';
const INTERVENTION_ID = 'int-1';
const URL = 'https://cias.app/interventions/int-1/sessions/s-1/fill?lang=en';
const TEST_URL = `${URL}&test_link_token=abc`;
const LABEL = 'Copy test link to this session';

type StateOptions = {
  currentUserId?: string;
  generating?: boolean;
};

const buildState = ({
  currentUserId = OWNER_ID,
  generating = false,
}: StateOptions = {}) => ({
  auth: { user: { id: currentUserId, roles: ['researcher'] } },
  intervention: {
    intervention: {
      id: INTERVENTION_ID,
      userId: OWNER_ID,
      hasCollaborators: false,
      currentEditor: null,
    },
    cache: { intervention: null },
    loaders: { generateTestLink: generating ? { [URL]: true } : {} },
    errors: { generateTestLink: {} },
  },
});

const buildStore = (stateOptions?: StateOptions) => {
  const state = buildState(stateOptions);
  const dispatch = jest.fn();

  return {
    dispatch,
    getState: () => state,
    subscribe: () => () => {},
    replaceReducer: () => {},
  } as any;
};

const renderButton = (store: any, props = {}) =>
  render(
    <Provider store={store}>
      <IntlProvider locale={DEFAULT_LOCALE}>
        <CopyTestLinkButton
          interventionId={INTERVENTION_ID}
          url={URL}
          label={LABEL}
          {...props}
        />
      </IntlProvider>
    </Provider>,
  );

const clickAndGetPayload = async (store: any) => {
  userEvent.click(screen.getByText(LABEL));
  await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
  return store.dispatch.mock.calls[0][0].payload;
};

const originalClipboard = navigator.clipboard;

describe('<CopyTestLinkButton />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Load-bearing: every case below except the `ClipboardItem` one asserts against the `writeText`
  // fallback, and a leftover `window.ClipboardItem` would silently route them down the other branch.
  afterEach(() => {
    Object.assign(navigator, { clipboard: originalClipboard });
    delete (window as any).ClipboardItem;
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderButton(buildStore());
    expect(spy).not.toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const { container } = renderButton(buildStore());
    expect(container).toMatchSnapshot();
  });

  it('renders for a user who can manage the intervention', () => {
    renderButton(buildStore());
    expect(screen.getByText(LABEL)).toBeInTheDocument();
  });

  it('is hidden for a user who cannot manage the intervention', () => {
    renderButton(buildStore({ currentUserId: 'someone-else' }));
    expect(screen.queryByText(LABEL)).not.toBeInTheDocument();
  });

  it('renders a non-submitting button', () => {
    renderButton(buildStore());
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('requests a token for the intervention when clicked', async () => {
    const store = buildStore();
    renderButton(store);

    const payload = await clickAndGetPayload(store);

    expect(store.dispatch.mock.calls[0][0].type).toEqual(
      GENERATE_TEST_LINK_REQUEST,
    );
    expect(payload.interventionId).toEqual(INTERVENTION_ID);
    expect(payload.url).toEqual(URL);
    expect(typeof payload.onSuccess).toEqual('function');
    expect(typeof payload.onError).toEqual('function');
  });

  it('writes the composed test url to the clipboard once the token arrives', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    const store = buildStore();
    renderButton(store);

    const { onSuccess } = await clickAndGetPayload(store);
    await act(async () => {
      await onSuccess(TEST_URL, '2026-09-04T12:03:16Z');
    });

    expect(writeText).toHaveBeenCalledWith(TEST_URL);
    expect(toast.error).not.toHaveBeenCalled();
    expect(toast.info).toHaveBeenCalledTimes(1);
    // Stops at the minute: some ICU builds put a narrow no-break space before "PM".
    expect(toast.info.mock.calls[0][0]).toMatch(/Sep 4, 2026,? 12:03/);
  });

  it('reports a refused clipboard write and does not claim success', async () => {
    const writeText = jest
      .fn()
      .mockRejectedValue(new DOMException('Denied', 'NotAllowedError'));
    Object.assign(navigator, { clipboard: { writeText } });

    const store = buildStore();
    renderButton(store);

    const { onSuccess } = await clickAndGetPayload(store);
    await act(async () => {
      await onSuccess(TEST_URL, '2026-09-04T12:03:16Z');
    });

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error.mock.calls[0][0]).toMatch(/could not be copied/);
    expect(toast.info).not.toHaveBeenCalled();
  });

  it('reports a browser with no clipboard API at all', async () => {
    Object.assign(navigator, { clipboard: undefined });

    const store = buildStore();
    renderButton(store);

    const { onSuccess } = await clickAndGetPayload(store);
    await act(async () => {
      await onSuccess(TEST_URL, '2026-09-04T12:03:16Z');
    });

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.info).not.toHaveBeenCalled();
  });

  it.each([
    ['a missing expiry', null],
    ['an unparseable expiry', 'not-a-date'],
  ])('still warns the researcher on %s', async (_name, expiresAt) => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    const store = buildStore();
    renderButton(store);

    const { onSuccess } = await clickAndGetPayload(store);
    await act(async () => {
      await onSuccess(TEST_URL, expiresAt);
    });

    expect(writeText).toHaveBeenCalledWith(TEST_URL);
    expect(toast.error).not.toHaveBeenCalled();
    expect(toast.info).toHaveBeenCalledTimes(1);
    expect(toast.info.mock.calls[0][0]).toMatch(/works for a few minutes/);
  });

  it('does not pin a fixed toastId, so a second copy is not deduped away', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    const store = buildStore();
    renderButton(store);

    const { onSuccess } = await clickAndGetPayload(store);
    await act(async () => {
      await onSuccess(TEST_URL, '2026-09-04T12:03:16Z');
    });

    expect(toast.info).toHaveBeenCalledTimes(1);
    expect(toast.info.mock.calls[0][1]?.toastId).toBeUndefined();
  });

  // jsdom has neither `ClipboardItem` nor a user-activation model, so the WebKit behaviour this
  // guards against cannot be reproduced here — a manual Safari smoke test is still required.
  it('starts the clipboard write inside the click, before dispatching the mint', async () => {
    class ClipboardItemStub {
      items: Record<string, unknown>;

      constructor(items: Record<string, unknown>) {
        this.items = items;
      }
    }
    (window as any).ClipboardItem = ClipboardItemStub;
    const write = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { write, writeText: jest.fn() } });

    const store = buildStore();
    const { container } = renderButton(store);

    container.querySelector('button')!.click();
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());

    expect(write).toHaveBeenCalledTimes(1);
    expect(write.mock.calls[0][0][0]).toBeInstanceOf(ClipboardItemStub);
    expect(write.mock.invocationCallOrder[0]).toBeLessThan(
      store.dispatch.mock.invocationCallOrder[0],
    );
  });

  // Earns its keep by *not* failing: without the no-op handlers on the deferred and the derived
  // blob promise, Jest fails this on the unhandled rejection.
  it('does not raise an unhandled rejection when the mint fails', async () => {
    Object.assign(navigator, { clipboard: { writeText: jest.fn() } });

    const store = buildStore();
    renderButton(store);

    const { onError } = await clickAndGetPayload(store);
    await act(async () => {
      onError(new Error('mint failed'));
      await Promise.resolve();
    });

    expect(toast.info).not.toHaveBeenCalled();
  });

  it('renders a disabled, unclickable button when disabled', () => {
    const store = buildStore();
    renderButton(store, { disabled: true });

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    userEvent.click(button);
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('shows its own spinner only while its own url is minting', () => {
    const { unmount } = renderButton(buildStore({ generating: true }));
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    unmount();

    renderButton(buildStore({ generating: true }), {
      url: 'https://cias.app/other',
    });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
