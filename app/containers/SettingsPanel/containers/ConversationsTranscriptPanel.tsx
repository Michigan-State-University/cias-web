import React from 'react';
import { useIntl } from 'react-intl';
import { Col as GridCol, Row as GridRow } from 'react-grid-system';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { colors, borders } from 'theme';

import { getFileUrl } from 'utils/getApiFileUrl';
import { FILE_GENERATION_TIME_FORMAT } from 'utils/dayjs';

import i18nGlobalMessages from 'global/i18n/globalMessages';
import {
  generateConversationsTranscriptRequest,
  makeSelectInterventionLoader,
  makeSelectInterventionError,
} from 'global/reducers/intervention';

import Column from 'components/Column';
import Text from 'components/Text';
import Button from 'components/Button';
import FileDownload from 'components/FileDownload';
import ErrorAlert from 'components/ErrorAlert';
import { Tooltip } from 'components/Tooltip';

import messages from '../messages';

export type Props = {
  generatedAt: Nullable<string>;
  filename: Nullable<string>;
  interventionId: string;
};

export const ConversationsTranscriptPanel = ({
  generatedAt,
  filename,
  interventionId,
}: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const generateTranscriptLoader = useSelector(
    makeSelectInterventionLoader('generateConversationsTranscript'),
  );
  const generateTranscriptError = useSelector(
    makeSelectInterventionError('generateConversationsTranscript'),
  );

  const generateTranscript = () => {
    dispatch(generateConversationsTranscriptRequest());
  };

  return (
    <Column
      bg={colors.zirkon}
      {...borders}
      borderColor={colors.linkWater}
      padding={16}
      gap={24}
      mt={16}
    >
      <Text lineHeight={1.5}>
        {formatMessage(messages.interventionConversationsTranscriptInfo)}
      </Text>
      <GridRow gutterWidth={16}>
        <GridCol xs={6}>
          <Button
            onClick={generateTranscript}
            loading={generateTranscriptLoader}
            inverted
            hoverable
            textColor="transparent"
            hoverTextColor={colors.white}
            title={formatMessage(
              messages[
                generatedAt ? 'generateNewTranscript' : 'generateTranscript'
              ],
            )}
          />
        </GridCol>
        {generatedAt && (
          <GridCol xs={6}>
            <Tooltip
              id={`intervention-conversations-transcript-generated-at-${generatedAt}`}
              text={`${formatMessage(i18nGlobalMessages.lastCsvDate)}${dayjs(
                generatedAt,
              ).format(FILE_GENERATION_TIME_FORMAT)}`}
              visible={!!generatedAt}
              stretchContent
            >
              <FileDownload
                url={getFileUrl(
                  `v1/interventions/${interventionId}/generated_conversations_transcript`,
                )}
                fileName={filename}
              >
                <Button title={formatMessage(messages.downloadTranscript)} />
              </FileDownload>
            </Tooltip>
          </GridCol>
        )}
      </GridRow>
      {generateTranscriptError && (
        <ErrorAlert errorText={generateTranscriptError} />
      )}
    </Column>
  );
};

export default ConversationsTranscriptPanel;
