import React from 'react';

import { ApiError } from 'models/Api';

import { themeColors } from 'theme';

import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import Text from 'components/Text';

import messages from '../messages';

export type Props<T> = {
  error: ApiError<T>;
};

export const ApiErrorMessage = <T,>({ error }: Props<T>) => (
  <Text color={themeColors.warning} fontWeight="bold" lineHeight="23px" mt={32}>
    {formatApiErrorMessage(error, messages.verifyErrorMessage)}
  </Text>
);
