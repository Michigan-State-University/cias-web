import React, { memo } from 'react';

import Text from 'components/Text';
import Column from 'components/Column';
import ApprovableInput from 'components/Input/ApprovableInput';
import OriginalTextHover from 'components/OriginalTextHover';

export type LabelledApprovableInputProps = {
  label: string;
  id: string;
  originalTextHover?: string;
} & Partial<React.ComponentProps<typeof ApprovableInput>>;

const LabelledApprovableInput = ({
  label,
  originalTextHover,
  id,
  ...restProps
}: LabelledApprovableInputProps) => (
  <Column>
    <Text id={id} mb={8}>
      {label}
    </Text>
    <OriginalTextHover
      id={`input-${id}-label`}
      text={originalTextHover || ''}
      hidden={!originalTextHover}
    >
      <ApprovableInput aria-labelledby={id} {...restProps} />
    </OriginalTextHover>
  </Column>
);

export default memo(LabelledApprovableInput);
