/**
 * Continue paths of HenryFordInitialScreen:
 * - a participant already verified by QR code (every provided_* value is null)
 *   can continue past the read-only manual form, with no null input values;
 * - an earlier verify error is not shown while a new confirm Continue is in flight;
 * - both Continue spinners, and the reset that keeps confirm-screen and
 *   manual-form errors apart.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';

import validatorsMessages from 'global/i18n/validatorsMessages';

import AnswerSessionPageReducer from 'containers/AnswerSessionPage/reducer';
import {
  setHfhsPatientDetail,
  setHfhsPatientDetailAnonymized,
  verifyPatientDataError,
  verifyQRCodeSuccess,
} from 'containers/AnswerSessionPage/actions';
import { VERIFY_PATIENT_DATA_REQUEST } from 'containers/AnswerSessionPage/constants';
import answerSessionPageMessages from 'containers/AnswerSessionPage/messages';
import layoutMessages from 'containers/AnswerSessionPage/layouts/messages';
import HenryFordInitialScreen from 'containers/AnswerSessionPage/components/HenryFordInitialScreen';

jest.mock('components/AztecQRScanner/Loadable', () => {
  // eslint-disable-next-line global-require
  const ReactMock = require('react');
  return ({ onScan, disabled }: Record<string, any>) =>
    ReactMock.createElement(
      'button',
      {
        type: 'button',
        'data-testid': 'mock-scan',
        disabled,
        onClick: () => onScan('<PtID>Z394</PtID>'),
      },
      'mock scanner',
    );
});

const CONTINUE = answerSessionPageMessages.nextQuestion.defaultMessage;
const SCAN_QR_CODE = layoutMessages.scanQRCodeTab.defaultMessage;
const ENTER_MANUALLY = layoutMessages.enterManuallyTab.defaultMessage;
const CONFIRM_HEADER = layoutMessages.confirmPatientData.defaultMessage;
const RESCAN = layoutMessages.rescan.defaultMessage;

const anonymizedPatient = {
  id: 'patient-detail-id',
  firstName: 'Jo**',
  lastName: 'Do**',
  dob: '1980',
  phoneNumber: '***-***-1234',
  mrn: '****5678',
};

// What the API (cias-api #414) sends as `hfhs_patient_detail` for a
// participant matched through the QR code: V1::HfhsPatientDetailSerializer
// reads only provided_*, which the barcode path never sets.
const qrVerifiedPatientDetail = {
  zipCode: null,
  firstName: null,
  lastName: null,
  dob: null,
  sex: null,
  phoneNumber: null,
  phoneType: null,
};

const apiError = (message: string) => ({
  response: { data: { message } },
});

const renderScreen = (
  props: Record<string, any> = {},
  preloadActions: any[] = [],
) => {
  const dispatched: any[] = [];
  const store = createStore(
    combineReducers({
      AnswerSessionPage: AnswerSessionPageReducer,
      language: (state = { locale: DEFAULT_LOCALE }) => state,
    }),
  );
  preloadActions.forEach((action) => store.dispatch(action));
  const originalDispatch = store.dispatch;
  store.dispatch = ((action: any) => {
    dispatched.push(action);
    return originalDispatch(action);
  }) as typeof store.dispatch;
  const saveAnswer = jest.fn();

  const utils = render(
    <Provider store={store}>
      <IntlProvider locale={DEFAULT_LOCALE}>
        <HenryFordInitialScreen
          {...({
            isMobilePreview: false,
            isPreview: false,
            disabled: false,
            continueButtonLoading: false,
            saveAnswer,
            ...props,
          } as any)}
        />
      </IntlProvider>
    </Provider>,
  );

  const dispatchToStore = (action: any) =>
    act(() => {
      store.dispatch(action);
    });

  return { ...utils, store, dispatched, saveAnswer, dispatchToStore };
};

const openTab = (label: string) => fireEvent.click(screen.getByText(label));

const scanAndConfirmScreen = (dispatchToStore: (action: any) => void) => {
  openTab(SCAN_QR_CODE);
  fireEvent.click(screen.getByTestId('mock-scan'));
  dispatchToStore(setHfhsPatientDetailAnonymized(anonymizedPatient));
  dispatchToStore(verifyQRCodeSuccess());
};

const confirmContinueButton = () => {
  const container = screen
    .getByText(CONFIRM_HEADER)
    .closest('[data-private]') as HTMLElement;
  return Array.from(container.querySelectorAll('button')).find(
    (button) => button.textContent !== RESCAN,
  ) as HTMLButtonElement;
};

const manualContinueButton = (container: HTMLElement) =>
  container.querySelector('[data-cy="continue-button"]') as HTMLButtonElement;

describe('<HenryFordInitialScreen /> Continue', () => {
  it('lets a participant verified by QR code continue past the read-only form', async () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    try {
      const { container, saveAnswer, dispatched } = renderScreen({}, [
        setHfhsPatientDetail(qrVerifiedPatientDetail),
      ]);

      fireEvent.click(manualContinueButton(container));

      await waitFor(() => expect(saveAnswer).toHaveBeenCalledWith(false));
      expect(screen.queryByText(/must be a `string` type/)).toBeNull();
      expect(
        dispatched.find(({ type }) => type === VERIFY_PATIENT_DATA_REQUEST),
      ).toBeUndefined();
      // Formik must not hand `null` to a controlled input.
      expect(
        consoleError.mock.calls.filter(([message]) =>
          String(message).includes('should not be null'),
        ),
      ).toEqual([]);
    } finally {
      consoleError.mockRestore();
    }
  });

  // Validation stays on for a participant who still has to verify.
  it('still validates the manual form before a participant is verified', async () => {
    const { container, dispatched } = renderScreen();

    fireEvent.change(
      screen.getByPlaceholderText(
        layoutMessages.zipCodePlaceholder.defaultMessage,
      ),
      { target: { value: '12' } },
    );
    fireEvent.click(manualContinueButton(container));

    expect(
      await screen.findByText(validatorsMessages.zipCode.defaultMessage),
    ).toBeInTheDocument();
    expect(
      dispatched.find(({ type }) => type === VERIFY_PATIENT_DATA_REQUEST),
    ).toBeUndefined();
  });

  it('does not show an earlier manual-entry error while the confirm Continue is in flight', () => {
    const { dispatchToStore } = renderScreen();

    dispatchToStore(verifyPatientDataError(apiError('Manual entry failed')));
    scanAndConfirmScreen(dispatchToStore);
    fireEvent.click(confirmContinueButton());

    expect(screen.queryByText('Manual entry failed')).not.toBeInTheDocument();

    dispatchToStore(verifyPatientDataError(apiError('No appointment found')));
    expect(screen.getByText('No appointment found')).toBeInTheDocument();
  });

  it('does not show the previous Continue error after a rescan while the new Continue is in flight', () => {
    const { dispatchToStore } = renderScreen();

    scanAndConfirmScreen(dispatchToStore);
    fireEvent.click(confirmContinueButton());
    dispatchToStore(verifyPatientDataError(apiError('Draft not found')));
    expect(screen.getByText('Draft not found')).toBeInTheDocument();

    fireEvent.click(screen.getByText(RESCAN));
    scanAndConfirmScreen(dispatchToStore);
    fireEvent.click(confirmContinueButton());

    expect(screen.queryByText('Draft not found')).not.toBeInTheDocument();
  });

  // Layout `continueButtonLoading={verifying}`
  it('shows a spinner on the manual Continue while the answer is submitted', () => {
    const { container } = renderScreen({ continueButtonLoading: true });

    expect(manualContinueButton(container).textContent).toBe('');
  });

  // Layout `loading={verifying}` on the confirm Continue
  it('shows a spinner on the confirm Continue while it verifies', () => {
    const { dispatchToStore } = renderScreen();

    scanAndConfirmScreen(dispatchToStore);
    expect(confirmContinueButton().textContent).toBe(CONTINUE);

    fireEvent.click(confirmContinueButton());

    expect(confirmContinueButton().textContent).not.toBe(CONTINUE);
  });

  // The manual submit resets `qrContinueSubmitted`
  it('keeps a manual-entry failure off the confirm screen after a failed confirm Continue', async () => {
    const { dispatchToStore, store } = renderScreen();

    scanAndConfirmScreen(dispatchToStore);
    fireEvent.click(confirmContinueButton());
    dispatchToStore(verifyPatientDataError(apiError('QR continue failed')));

    openTab(ENTER_MANUALLY);
    fireEvent.change(
      screen.getByPlaceholderText(
        layoutMessages.firstNamePlaceholder.defaultMessage,
      ),
      { target: { value: 'Ann' } },
    );
    fireEvent.change(
      screen.getByPlaceholderText(
        layoutMessages.lastNamePlaceholder.defaultMessage,
      ),
      { target: { value: 'Lee' } },
    );
    fireEvent.change(
      screen.getByPlaceholderText(
        layoutMessages.zipCodePlaceholder.defaultMessage,
      ),
      { target: { value: '48202' } },
    );
    fireEvent.click(document.querySelector('[data-cy="continue-button"]')!);
    // Formik validates asynchronously before it submits.
    await waitFor(() =>
      expect(
        (store.getState() as any).AnswerSessionPage.verifyPatientDataLoading,
      ).toBe(true),
    );
    dispatchToStore(verifyPatientDataError(apiError('Manual failed')));
    expect(screen.getByText('Manual failed')).toBeInTheDocument();

    openTab(SCAN_QR_CODE);

    expect(screen.getByText(CONFIRM_HEADER)).toBeInTheDocument();
    expect(screen.queryByText('Manual failed')).not.toBeInTheDocument();
  });
});
