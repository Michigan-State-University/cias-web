import React, { useState } from 'react';

import { htmlToPlainText } from 'utils/htmlToPlainText';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';

type Props = {
  emptyWidth: number;
  value: string;
} & Record<string, any>;

const FlexibleWidthApprovableInput = ({
  emptyWidth,
  value,
  ...restProps
}: Props): JSX.Element => {
  const [inputValue, setInputValue] = useState(value);

  return (
    <Box minWidth={htmlToPlainText(inputValue) ? null : emptyWidth}>
      <ApprovableInput
        onValueChange={setInputValue}
        value={value}
        {...restProps}
      />
    </Box>
  );
};

export default FlexibleWidthApprovableInput;
