import React from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';
import CrossTextBold from 'assets/svg/cross-text-bold.svg';

import { getIconForExtension } from 'utils/fileIcons';

import { EllipsisText } from 'components/Text';
import { ImageButton } from 'components/Button';
import Box from 'components/Box';
import Row from 'components/Row';
import Img from 'components/Img';

import messages from './messages';

export type Props = {
  file: File;
  onRemove: () => void;
};

const FileInputValue = ({ file: { name }, onRemove }: Props) => {
  const { formatMessage } = useIntl();

  return (
    <Row key={name} padding={16} gap={16} bg={colors.linkWater} align="center">
      <Img
        alt={formatMessage(messages.fileExtensionIcon)}
        src={getIconForExtension(name)}
        height={26}
      />
      <Box flex={1}>
        <EllipsisText fontWeight="bold" text={name} wordBreak="break-all" />
      </Box>
      <ImageButton
        src={CrossTextBold}
        onClick={onRemove}
        title={formatMessage(messages.removeFile)}
        padding={0}
        width={24} // Width set explicitly because ellipsis text wasn't calculating available space correctly
      />
    </Row>
  );
};

export default FileInputValue;
