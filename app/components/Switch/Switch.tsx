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
        data-cy="branching-intervention-toggle"
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
