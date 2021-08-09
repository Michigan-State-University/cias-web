import React, { useEffect, useState } from 'react';

import { htmlToPlainText } from 'utils/htmlToPlainText';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';

type Props = {
  emptyWidth: number;
  value: string;
};

const FlexibleWidthApprovableInput = ({
  emptyWidth,
  value,
  ...restProps
}: Props): JSX.Element => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Box minWidth={htmlToPlainText(inputValue) ? null : emptyWidth}>
      <ApprovableInput
        onChange={setInputValue}
        value={inputValue}
        {...restProps}
      />
    </Box>
  );
};

export default FlexibleWidthApprovableInput;
