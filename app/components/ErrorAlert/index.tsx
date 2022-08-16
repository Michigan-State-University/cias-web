/**
 *
 * ErrorAlert
 *
 */

import React from 'react';

import Row from 'components/Row';
import Img from 'components/Img';
import Text from 'components/Text';
import ConditionalWrapper from 'components/ConditionalWrapper';
import exclamationMark from 'assets/svg/exclamationMark.svg';

import { AlertContainer } from './styled';

type Props = {
  errorText: string | object;
  fullPage?: boolean;
} & Record<string, any>;

const ErrorAlert = ({ errorText, fullPage, ...restProps }: Props) => {
  const toDisplay = errorText.toString().split('\n')[0];

  return (
    <ConditionalWrapper
      if={fullPage}
      with={Row}
      wrapperProps={{ width: '100%', justify: 'center', mt: 100 }}
    >
      <AlertContainer {...restProps}>
        <Img src={exclamationMark} alt="error" mr={15} />
        <Text fontWeight="bold" fontSize={15}>
          {toDisplay}
        </Text>
      </AlertContainer>
    </ConditionalWrapper>
  );
};

export default ErrorAlert;
