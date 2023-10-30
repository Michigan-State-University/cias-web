/**
 *
 * OriginalTextHover
 *
 */

import React, { memo, useCallback } from 'react';
import { useIntl } from 'react-intl';

import { Markup } from 'interweave';

import translateIcon from 'assets/svg/translate.svg';

import Tooltip from 'components/Tooltip';
import Text from 'components/Text';
import Box from 'components/Box';

import messages from './messages';
import { OriginalText } from './styled';
import { OriginalTextIconPosition } from './types';

type Props = {
  children?: React.ReactNode;
  id: string;
  text: string | undefined;
  hidden?: boolean;
  iconPosition?: OriginalTextIconPosition;
  iconProps?: Record<string, unknown>;
};

const OriginalTextHover = ({
  children,
  id,
  text,
  hidden = false,
  iconProps,
  iconPosition = OriginalTextIconPosition.END,
  ...restProps
}: Props & Record<string, unknown>): JSX.Element => {
  const { formatMessage } = useIntl();

  const tooltipContent = useCallback(
    () => (
      <>
        <Text fontWeight="bold">{formatMessage(messages.originalText)}</Text>
        <OriginalText>
          <Markup content={text} noWrap />
        </OriginalText>
      </>
    ),
    [text],
  );

  return (
    <Box
      gap={15}
      display="flex"
      direction={
        iconPosition === OriginalTextIconPosition.END ? 'row' : 'row-reverse'
      }
      align="center"
      {...restProps}
    >
      {children}
      {!hidden && text && (
        // @ts-ignore
        <Tooltip
          id={`original-text-${id}`}
          icon={translateIcon}
          content={tooltipContent()}
          {...iconProps}
        />
      )}
    </Box>
  );
};

export default memo(OriginalTextHover);
export { OriginalTextIconPosition };
