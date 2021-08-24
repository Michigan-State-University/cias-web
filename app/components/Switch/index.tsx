import React, { CSSProperties, memo, ReactNode, useCallback } from 'react';

import { Slider, SwitchInput, SwitchWrapper } from './styled';
import { LabelPosition } from './constants';
import SwitchLabelWrapper from './SwitchLabelWrapper';

type Props = {
  checked: boolean;
  children?: ReactNode;
  disabled?: boolean;
  id?: string;
  labelPosition?: LabelPosition;
  onToggle: (value: boolean) => void;
} & Partial<CSSProperties>; // `CSSProperties` for now; after refactor use specific type `SwitchWrapper` can get

const Switch = ({
  checked = false,
  children,
  disabled = false,
  id,
  labelPosition = LabelPosition.Left,
  onToggle,
  ...props
}: Props): JSX.Element => {
  const onClick = useCallback(() => {
    onToggle(!checked);
  }, [checked, onToggle]);

  // needed empty function for HTML correctness
  const onChange = useCallback(() => {}, []);

  return (
    <SwitchLabelWrapper labelPosition={labelPosition}>
      <SwitchWrapper onClick={onClick} {...props}>
        <SwitchInput
          id={id}
          data-cy="branching-intervention-toggle"
          data-testid="switch-input"
          disabled={disabled}
          checked={checked}
          onChange={onChange}
        />
        <Slider />
      </SwitchWrapper>

      {children && <label htmlFor={id}>{children}</label>}
    </SwitchLabelWrapper>
  );
};

export { LabelPosition };
export default memo(Switch);
