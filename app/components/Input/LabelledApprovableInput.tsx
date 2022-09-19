import React, { memo } from 'react';

import Text from 'components/Text';
import Column from 'components/Column';
import ApprovableInput from 'components/Input/ApprovableInput';

export type LabelledApprovableInputProps = {
  label: string;
  id: string;
} & Partial<React.ComponentProps<typeof ApprovableInput>>;

const LabelledApprovableInput = ({
  label,
  id,
  ...restProps
}: LabelledApprovableInputProps) => (
  <Column>
    <Text id={id} mb={8}>
      {label}
    </Text>
    <ApprovableInput aria-labelledby={id} {...restProps} />
  </Column>
);

export default memo(LabelledApprovableInput);
