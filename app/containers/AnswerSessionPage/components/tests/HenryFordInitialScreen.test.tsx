/**
 *
 * Tests for HenryFordInitialScreen (QR code path, CIAS-4006/4007/4008)
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import axios from 'axios';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { DEFAULT_LOCALE } from 'i18n';

import AnswerSessionPageReducer, { initialState } from '../../reducer';
import {
  setHfhsPatientDetailAnonymized,
  verifyPatientDataError,
  verifyPatientDataRequest,
  verifyQRCodeError,
  verifyQRCodeRequest,
  verifyQRCodeSuccess,
} from '../../actions';
import {
  VERIFY_PATIENT_DATA_REQUEST,
  VERIFY_QR_CODE_REQUEST,
} from '../../constants';
import { verifyQRCode } from '../../saga';
import answerSessionPageMessages from '../../messages';
import layoutMessages from '../../layouts/messages';
import HenryFordInitialScreen from '../HenryFordInitialScreen';

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

const ENTER_MANUALLY = layoutMessages.enterManuallyTab.defaultMessage;
const SCAN_QR_CODE = layoutMessages.scanQRCodeTab.defaultMessage;
const CONFIRM_HEADER = layoutMessages.confirmPatientData.defaultMessage;
const RESCAN = layoutMessages.rescan.defaultMessage;
const FIRST_NAME_PLACEHOLDER =
  layoutMessages.firstNamePlaceholder.defaultMessage;

const anonymizedPatient = {
  id: 'patient-detail-id',
  firstName: 'Jo**',
  lastName: 'Do**',
  dob: '1980',
  phoneNumber: '***-***-1234',
  mrn: '****5678',
};

const apiError = (message: string) => ({
  response: { data: { message } },
});

const setupStore = () => {
  const dispatched: any[] = [];
  const rootReducer = combineReducers({
    AnswerSessionPage: AnswerSessionPageReducer,
    language: (state = { locale: DEFAULT_LOCALE }) => state,
  });
  const store = createStore(rootReducer);
  const originalDispatch = store.dispatch;
  store.dispatch = ((action: any) => {
    dispatched.push(action);
    return originalDispatch(action);
  }) as typeof store.dispatch;
  return { store, dispatched };
};

const renderScreen = (props: Record<string, any> = {}) => {
  const { store, dispatched } = setupStore();
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

const scanAndConfirmScreen = (dispatchToStore: (action: any) => void): void => {
  openTab(SCAN_QR_CODE);
  fireEvent.click(screen.getByTestId('mock-scan'));
  dispatchToStore(setHfhsPatientDetailAnonymized(anonymizedPatient));
  dispatchToStore(verifyQRCodeSuccess());
};

const clickConfirmContinue = () => {
  const header = screen.getByText(CONFIRM_HEADER);
  const container = header.closest('[data-private]') as HTMLElement;
  const continueButton = Array.from(container.querySelectorAll('button')).find(
    (button) =>
      button.textContent ===
      answerSessionPageMessages.nextQuestion.defaultMessage,
  ) as HTMLButtonElement;
  fireEvent.click(continueButton);
};

describe('<HenryFordInitialScreen /> QR code path', () => {
  it('sends the scanned label for verification', () => {
    const { dispatched } = renderScreen();

    openTab(SCAN_QR_CODE);
    fireEvent.click(screen.getByTestId('mock-scan'));

    expect(dispatched).toContainEqual(verifyQRCodeRequest('<PtID>Z394</PtID>'));
  });

  it('shows masked data and continues with the record id only', () => {
    const { dispatched, dispatchToStore } = renderScreen();

    scanAndConfirmScreen(dispatchToStore);

    expect(screen.getByText(CONFIRM_HEADER)).toBeInTheDocument();
    expect(screen.getByText('Jo**')).toBeInTheDocument();
    expect(screen.getByText('****5678')).toBeInTheDocument();

    clickConfirmContinue();

    expect(dispatched).toContainEqual(
      verifyPatientDataRequest({ id: anonymizedPatient.id }),
    );
  });

  it('moves focus to the confirm heading after a scan', () => {
    const { dispatchToStore } = renderScreen();

    scanAndConfirmScreen(dispatchToStore);

    expect(screen.getByText(CONFIRM_HEADER)).toHaveFocus();
  });

  it('keeps confirm-screen values out of LogRocket session replay', () => {
    const { dispatchToStore } = renderScreen();

    scanAndConfirmScreen(dispatchToStore);

    expect(screen.getByText('Jo**').closest('[data-private]')).not.toBeNull();
  });

  // Review item 1
  it('shows a failed confirm Continue on the confirm screen', () => {
    const { dispatchToStore } = renderScreen();

    scanAndConfirmScreen(dispatchToStore);
    clickConfirmContinue();
    dispatchToStore(verifyPatientDataRequest({ id: anonymizedPatient.id }));
    dispatchToStore(verifyPatientDataError(apiError('No appointment found')));

    expect(screen.getByText('No appointment found')).toBeInTheDocument();
  });

  // Review item 1: the error is shared with the manual path, so an earlier
  // manual failure must not leak onto a fresh confirm screen.
  it('does not show an earlier manual-entry error on the confirm screen', () => {
    const { dispatchToStore } = renderScreen();

    dispatchToStore(verifyPatientDataError(apiError('Manual entry failed')));
    scanAndConfirmScreen(dispatchToStore);

    expect(screen.queryByText('Manual entry failed')).not.toBeInTheDocument();
  });

  it('hides the confirm Continue error after a rescan', () => {
    const { dispatchToStore } = renderScreen();

    scanAndConfirmScreen(dispatchToStore);
    clickConfirmContinue();
    dispatchToStore(verifyPatientDataError(apiError('No appointment found')));
    fireEvent.click(screen.getByText(RESCAN));
    scanAndConfirmScreen(dispatchToStore);

    expect(screen.queryByText('No appointment found')).not.toBeInTheDocument();
  });

  it('shows a QR verification error under the scanner', () => {
    const { dispatchToStore } = renderScreen();

    openTab(SCAN_QR_CODE);
    dispatchToStore(verifyQRCodeRequest('<PtID>Z394</PtID>'));
    dispatchToStore(verifyQRCodeError(apiError('Label not recognised')));

    expect(screen.getByText('Label not recognised')).toBeInTheDocument();
  });

  // Review item 3
  it('does not switch tabs while a QR verification is in flight', () => {
    const { dispatchToStore } = renderScreen();

    openTab(SCAN_QR_CODE);
    dispatchToStore(verifyQRCodeRequest('<PtID>Z394</PtID>'));
    openTab(ENTER_MANUALLY);

    expect(
      screen.queryByPlaceholderText(FIRST_NAME_PLACEHOLDER),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-scan')).toBeInTheDocument();
  });

  it('does not switch tabs while the confirm Continue is in flight', () => {
    const { dispatchToStore } = renderScreen();

    scanAndConfirmScreen(dispatchToStore);
    clickConfirmContinue();
    openTab(ENTER_MANUALLY);

    expect(screen.getByText(CONFIRM_HEADER)).toBeInTheDocument();
  });

  // Review item 4
  it('keeps Enter Manually usable after a scan', () => {
    const { dispatchToStore } = renderScreen();

    scanAndConfirmScreen(dispatchToStore);
    openTab(ENTER_MANUALLY);

    expect(screen.getByPlaceholderText(FIRST_NAME_PLACEHOLDER)).toBeEnabled();
  });

  it('keeps typed manual data across a tab round-trip', () => {
    renderScreen();

    fireEvent.change(screen.getByPlaceholderText(FIRST_NAME_PLACEHOLDER), {
      target: { value: 'Jane' },
    });
    openTab(SCAN_QR_CODE);
    openTab(ENTER_MANUALLY);

    expect(screen.getByPlaceholderText(FIRST_NAME_PLACEHOLDER)).toHaveValue(
      'Jane',
    );
  });

  it('drops the scan result when the screen unmounts', () => {
    const { dispatchToStore, store, unmount } = renderScreen();

    scanAndConfirmScreen(dispatchToStore);
    unmount();

    expect(
      (store.getState() as any).AnswerSessionPage.hfhsPatientDetailAnonymized,
    ).toBeNull();
  });

  it('skips verification in preview', () => {
    const { dispatched, saveAnswer } = renderScreen({ isPreview: true });

    openTab(SCAN_QR_CODE);
    fireEvent.click(screen.getByTestId('mock-scan'));

    expect(saveAnswer).toHaveBeenCalledWith(false);
    expect(
      dispatched.find(({ type }) => type === VERIFY_QR_CODE_REQUEST),
    ).toBeUndefined();
    expect(
      dispatched.find(({ type }) => type === VERIFY_PATIENT_DATA_REQUEST),
    ).toBeUndefined();
  });
});

describe('AnswerSessionPage reducer – QR code', () => {
  it('clears a QR error when the scan result is set or cleared', () => {
    const withError = AnswerSessionPageReducer(
      initialState,
      verifyQRCodeError(apiError('Label not recognised')),
    );
    expect(withError.verifyQRCodeError).not.toBeNull();
    expect(withError.verifyQRCodeLoading).toBe(false);

    const cleared = AnswerSessionPageReducer(
      withError,
      setHfhsPatientDetailAnonymized(null),
    );
    expect(cleared.verifyQRCodeError).toBeNull();
    expect(cleared.hfhsPatientDetailAnonymized).toBeNull();
  });
});

describe('verifyQRCode saga', () => {
  const action = verifyQRCodeRequest('<PtID>Z394</PtID>');
  // The saga lives in plain JS, so TS infers its parameters as `never`.
  const saga = verifyQRCode as (...args: any[]) => any;

  it('posts the label and stores the anonymized record', () => {
    const response = {
      data: {
        data: {
          id: anonymizedPatient.id,
          type: 'hfhs_patient_detail_anonymized',
          attributes: {
            first_name: 'Jo**',
            last_name: 'Do**',
            dob: '1980',
            phone_number: '***-***-1234',
            mrn: '****5678',
          },
        },
      },
    };

    return expectSaga(saga, action)
      .provide([[matchers.call.fn(axios.post), response]])
      .call(axios.post, '/v1/henry_ford/verify_by_code', {
        hfhs_patient_data: { barcode: '<PtID>Z394</PtID>' },
      })
      .put(setHfhsPatientDetailAnonymized(anonymizedPatient))
      .put(verifyQRCodeSuccess())
      .run();
  });

  it('reports a failed verification', () => {
    const error = new Error('422');

    return expectSaga(saga, action)
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .put(verifyQRCodeError(error))
      .run();
  });
});
