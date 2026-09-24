import React, { ComponentProps } from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';

import { TextMessageType } from 'models/TextMessage';

import { TextMessageTypeChooser } from '../TextMessageTypeChooser';
import {
  ALERT_FOR_THIRD_PARTY_LABEL_ID,
  INFORMATION_FOR_PARTICIPANT_LABEL_ID,
} from '../constants';

describe('<TextMessageTypeChooser />', () => {
  const defaultProps: ComponentProps<typeof TextMessageTypeChooser> = {
    type: TextMessageType.NORMAL,
    onTypeChange: jest.fn(),
    disabled: false,
  };

  const renderComponent = (
    props: Partial<ComponentProps<typeof TextMessageTypeChooser>> = {},
  ) =>
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <TextMessageTypeChooser {...defaultProps} {...props} />
      </IntlProvider>,
    );

  const getRadioInput = (container: HTMLElement, labelId: string) =>
    container.querySelector(`#${labelId}`) as HTMLInputElement | null;

  // Note: the standard "no console errors" assertion is intentionally omitted
  // here. The pre-existing `typeOfTheSMSTooltip` message embeds raw <h3>/<p>
  // HTML (parsed downstream by <Markup>), which react-intl v6 logs as a
  // FORMAT_ERROR before rendering it verbatim. That console error is unrelated
  // to this component's logic and predates this change.

  it('should match snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('keeps the "Information for participant" radio enabled by default', () => {
    const { container } = renderComponent();
    const normalRadio = getRadioInput(
      container,
      INFORMATION_FOR_PARTICIPANT_LABEL_ID,
    );
    expect(normalRadio).not.toBeNull();
    expect(normalRadio?.disabled).toBe(false);
  });

  it('disables the "Information for participant" radio when normalTypeDisabled is true', () => {
    const { container } = renderComponent({ normalTypeDisabled: true });

    const normalRadio = getRadioInput(
      container,
      INFORMATION_FOR_PARTICIPANT_LABEL_ID,
    );
    const alertRadio = getRadioInput(container, ALERT_FOR_THIRD_PARTY_LABEL_ID);

    expect(normalRadio?.disabled).toBe(true);
    // the Alert option must remain available on RA sessions
    expect(alertRadio?.disabled).toBe(false);
  });
});
