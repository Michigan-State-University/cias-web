import React from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import Box from 'components/Box';
import Text from 'components/Text';
import { FileDisplayItem } from 'components/FileDisplayItem';
import Row from 'components/Row';

import { AppFile } from 'models/File';

import i18nMessages from '../messages';

const CHAT_DIALOG_PX = 2 * 16;

type Props = {
  participantFiles: AppFile[];
};

const ParticipantFilesPanel = ({ participantFiles }: Props) => {
  const { formatMessage } = useIntl();

  return (
    <Box
      position="absolute"
      bg={colors.white}
      width={`calc(100% - ${CHAT_DIALOG_PX}px)`}
      mt={42}
      py={16}
      borderBottom={`1px solid ${colors.linkWater}`}
      borderRadius={0}
      zIndex={1}
    >
      <Text color={colors.bluewood} textOpacity={0.7} mb={8} fontSize={12}>
        {formatMessage(i18nMessages.downloadInstructions)}
      </Text>
      <Box maxHeight={156} overflow="auto">
        {participantFiles.map((file) => (
          <Row
            key={file.id}
            bg={colors.lightBlue}
            width="100%"
            padding="12px"
            align="center"
            mt={8}
          >
            <FileDisplayItem fileInfo={file} textProps={{ fontSize: 13 }} />
          </Row>
        ))}
      </Box>
    </Box>
  );
};

export default ParticipantFilesPanel;
