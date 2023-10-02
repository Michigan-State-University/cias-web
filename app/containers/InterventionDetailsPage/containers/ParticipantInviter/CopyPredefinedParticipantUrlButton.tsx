import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import ShareIcon from 'assets/svg/share.svg';

import { themeColors } from 'theme';

import CopyToClipboard from 'components/CopyToClipboard';
import { ImageButton } from 'components/Button';

import messages from './messages';

export type Props = {
  url: string;
};

export const CopyPredefinedParticipantUrlButton: FC<Props> = ({ url }) => {
  const { formatMessage } = useIntl();

  return (
    <CopyToClipboard
      // @ts-ignore
      renderAsCustomComponent
      textToCopy={url}
      popupVerticalPosition="center"
      popupHorizontalPosition="left"
    >
      <ImageButton
        src={ShareIcon}
        title={formatMessage(messages.copyPredefinedParticipanyUrlButtonTitle)}
        fill={themeColors.text}
        showHoverEffect
        noHoverBackground
      />
    </CopyToClipboard>
  );
};
