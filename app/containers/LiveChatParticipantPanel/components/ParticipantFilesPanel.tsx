import React from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import Box from 'components/Box';
import Text from 'components/Text';
import { FileDisplayItem } from 'components/FileDisplayItem';
import Row from 'components/Row';

import { AppFile } from 'models/File';

import i18nMessages from '../messages';
import { BoxWithUnderShadow } from './styled';

type Props = {
  participantFiles: AppFile[];
};

const ParticipantFilesPanel = ({ participantFiles }: Props) => {
  const { formatMessage } = useIntl();

  return (
    <BoxWithUnderShadow>
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
    </BoxWithUnderShadow>
  );
};

export default ParticipantFilesPanel;
