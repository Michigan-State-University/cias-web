import React, { ChangeEvent, ChangeEventHandler, memo, ReactNode } from 'react';

import Row from 'components/Row';
import { LayoutProps, MarginProps } from 'components/BaseComponentStyles';

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
        disabled={disabled}
        checked={checked}
        onChange={nativeChangeHandler ? onChange : handleOnChange}
        onBlur={onBlur}
      />

      <StyledLabel htmlFor={id}>
        <SwitchLabelWrapper labelPosition={labelPosition} {...props}>
          <SwitchWrapper>
            <Slider />
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
