import React, { ChangeEvent, memo, ReactNode } from 'react';

import Row from 'components/Row';

import SwitchLabelWrapper from './SwitchLabelWrapper';

import {
  LabelContent,
  Slider,
  StyledLabel,
  SwitchInput,
  SwitchWrapper,
} from './styled';
import { LabelPosition } from './constants';

type Props = {
  checked: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string;
  labelPosition?: LabelPosition;
  onToggle: (value: boolean, event: ChangeEvent<HTMLInputElement>) => void;
};

const Switch = ({
  checked = false,
  children,
  className,
  disabled = false,
  id,
  labelPosition = LabelPosition.Left,
  onToggle,
}: Props): JSX.Element => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        onChange={handleOnChange}
      />

      <StyledLabel htmlFor={id}>
        <SwitchLabelWrapper labelPosition={labelPosition}>
          <SwitchWrapper>
            <Slider />
          </SwitchWrapper>

          <LabelContent $labelPosition={labelPosition}>{children}</LabelContent>
        </SwitchLabelWrapper>
      </StyledLabel>
    </Row>
  );
};

export default memo(Switch);
