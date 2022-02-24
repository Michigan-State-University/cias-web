/**
 *
 * ErrorAlert
 *
 */

import React, { memo, ReactElement } from 'react';
import identity from 'lodash/identity';

import Row from 'components/Row';
import Img from 'components/Img';
import Text from 'components/Text';
import exclamationMark from 'assets/svg/exclamationMark.svg';

import { AlertContainer } from './styled';

type ErrorAlertProps = {
  errorText: string;
  fullPage?: boolean;
} & Record<string, unknown>;

const ErrorAlert = ({ errorText, fullPage, ...restProps }: ErrorAlertProps) => {
  const toDisplay = errorText.toString().split('\n')[0];

  const wrapWithRow = (child: ReactElement) => (
    <Row width="100%" justify="center" mt={100}>
      {child}
    </Row>
  );

  const wrapper = fullPage ? wrapWithRow : identity;
  return (
    <>
      {wrapper(
        <AlertContainer {...restProps}>
          <Img src={exclamationMark} alt="error" mr={15} />
          <Text fontWeight="bold" fontSize={15}>
            {toDisplay}
          </Text>
        </AlertContainer>,
      )}
    </>
  );
};

export default memo(ErrorAlert);
