/**
 *
 * Radio
 *
 */

import React, { ChangeEvent, memo, ReactNode } from 'react';

import { themeColors } from 'theme';

import radio from 'assets/svg/radio-button.svg';
import radioChecked from 'assets/svg/radio-button-checked.svg';

import Row from 'components/Row';

import RadioLabelWrapper from './RadioLabelWrapper';

import { LabelContent, StyledIcon, StyledLabel, StyledRadio } from './styled';
import { LabelPosition } from './constants';

export type Props = {
  checked: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  id: string;
  labelPosition?: LabelPosition;
  onChange?: Nullable<
    (value: boolean, event: ChangeEvent<HTMLInputElement>) => void
  >;
  stroke?: boolean | string;
  labelOffset?: number;
};

const Radio = ({
  checked,
  children,
  className,
  disabled = false,
  id,
  labelPosition = LabelPosition.Right,
  onChange,
  stroke,
  labelOffset,
  ...restProps
}: Props): JSX.Element => {
  const icon = checked ? radioChecked : radio;

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked: newValue },
    } = event;

    return onChange?.(newValue, event);
  };

  return (
    <Row justify="between" align="center" className={className}>
      <StyledRadio
        {...restProps}
        checked={checked}
        disabled={disabled}
        id={id}
        onChange={handleOnChange}
        $clickable
      />

      <StyledLabel htmlFor={id}>
        <RadioLabelWrapper labelPosition={labelPosition}>
          <StyledIcon
            src={icon}
            fill={themeColors.secondary}
            stroke={stroke || themeColors.secondary}
          />
          {children && (
            <LabelContent
              $labelPosition={labelPosition}
              $labelOffset={labelOffset}
            >
              {children}
            </LabelContent>
          )}
        </RadioLabelWrapper>
      </StyledLabel>
    </Row>
  );
};

export default memo(Radio);
