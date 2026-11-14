import React, {
  AriaAttributes,
  ChangeEvent,
  ChangeEventHandler,
  memo,
  ReactNode,
} from 'react';

import Row from 'components/Row';
import { LayoutProps, MarginProps } from 'components/BaseComponentStyles';
import Loader from 'components/Loader';

import SwitchLabelWrapper from './SwitchLabelWrapper';

import {
  LabelContent,
  Slider,
  StyledLabel,
  SwitchInput,
  SwitchWrapper,
} from './styled';
import { LabelPosition } from './constants';

type NativeChangeHandlerProps = {
  onToggle?: undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  nativeChangeHandler: true;
};

type CustomChangeHandlerProps = {
  onToggle: (value: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  onChange?: undefined;
  nativeChangeHandler?: false;
};

type ChangeHandlerProps = NativeChangeHandlerProps | CustomChangeHandlerProps;

export type Props = {
  checked?: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  id: string;
  labelPosition?: LabelPosition;
  labelOffset?: number;
  onBlur?: HTMLInputElement['onblur'];
  ariaLabel?: AriaAttributes['aria-label'];
  loading?: boolean;
  /**
   * Test hook for the underlying input. Pass a value specific to the switch.
   *
   * The default is a leftover: `data-cy="branching-intervention-toggle"` used
   * to be hard-coded here, so every switch in the app reports itself as the
   * branching toggle. Nothing selects on it — it appears only in Jest
   * snapshots — so it is kept purely to avoid unrelated snapshot churn, and
   * can be dropped along with a `jest -u`.
   */
  dataCy?: string;
} & ChangeHandlerProps &
  LayoutProps &
  MarginProps;

const Switch = ({
  checked = false,
  children,
  className,
  disabled = false,
  id,
  labelPosition = LabelPosition.Left,
  labelOffset,
  onToggle,
  onChange,
  onBlur,
  nativeChangeHandler,
  ariaLabel,
  loading,
  dataCy = 'branching-intervention-toggle',
  ...props
}: Props): JSX.Element => {
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { checked: newValue },
    } = event;

    return onToggle?.(newValue, event);
  };

  return (
    <Row justify="between" align="center" className={className}>
      <SwitchInput
        id={id}
        data-cy={dataCy}
        data-testid="switch-input"
        aria-label={ariaLabel}
        disabled={disabled}
        checked={checked}
        onChange={nativeChangeHandler ? onChange : handleOnChange}
        onBlur={onBlur}
      />

      <StyledLabel htmlFor={id}>
        <SwitchLabelWrapper labelPosition={labelPosition} {...props}>
          <SwitchWrapper>
            {!loading && <Slider />}
            {loading && <Loader type="inline" size={21} />}
          </SwitchWrapper>

          <LabelContent
            $labelPosition={labelPosition}
            $labelOffset={labelOffset}
          >
            {children}
          </LabelContent>
        </SwitchLabelWrapper>
      </StyledLabel>
    </Row>
  );
};

export default memo(Switch);
