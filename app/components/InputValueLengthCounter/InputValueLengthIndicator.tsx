import React from 'react';

import { themeColors } from 'theme';

import Text from 'components/Text';

export type Props = {
  maxLength: number;
  value?: string;
};

export const InputValueLengthIndicator: React.FC<Props> = ({
  value,
  maxLength,
}) => {
  const currentLength = (value ?? '').length;
  const isValid = currentLength <= maxLength;

  return (
    <Text color={isValid ? themeColors.text : themeColors.alert}>
      {currentLength}/{maxLength}
    </Text>
  );
};
