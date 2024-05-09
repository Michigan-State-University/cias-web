/**
 *
 * Checkbox
 *
 */

import React, { ChangeEvent, ReactNode } from 'react';

import { themeColors } from 'theme';

import checkbox from 'assets/svg/checkbox.svg';
import checkboxChecked from 'assets/svg/checkbox-checked.svg';

import Row from 'components/Row';

import { StyledCheckbox, StyledLabel, StyledIcon } from './styled';

type Props = {
  checked: boolean;
  labelBelow: boolean;
  children?: ReactNode;
  disabled?: boolean;
  id: string;
  onChange: (value: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  stroke?: boolean | string;
};

const Checkbox = ({
  checked,
  children,
  disabled = false,
  labelBelow = false,
  id,
  onChange,
  stroke,
  ...restProps
}: Props): JSX.Element => {
  const icon = checked ? checkboxChecked : checkbox;

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked: newValue },
    } = event;

    return onChange(newValue, event);
  };

  return (
    <Row justify="between" align="center">
      <StyledCheckbox
        {...restProps}
        checked={checked}
        disabled={disabled}
        id={id}
        onChange={handleOnChange}
        $clickable
      />

      <StyledLabel
        htmlFor={id}
        className={`${labelBelow ? '' : 'in-row-label'}`}
      >
        <StyledIcon
          src={icon}
          fill={themeColors.secondary}
          stroke={stroke || themeColors.secondary}
        />

        {children}
      </StyledLabel>
    </Row>
  );
};

export default Checkbox;
