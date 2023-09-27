/**
 *
 * TranslateVoiceSettings
 *
 */

import React, { useEffect, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useGet from 'utils/useGet';
import {
  voiceByGoogleLanguageIdSelectFormatter,
  VoiceSelectOption,
} from 'utils/formatters';

import { Voice, VoiceDTO } from 'models/Voice';
import { ApiDataCollection } from 'models/Api';

import { voiceDataParser } from 'global/parsers';

import { fontSizes, themeColors } from 'theme';
import Text from 'components/Text';
import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';
import Select from 'components/Select';
import Column from 'components/Column';
import Row from 'components/Row';
import TextVoicePreviewInput from 'components/Input/TextVoicePreviewInput';

import messages from './messages';
import { DESTINATION_VOICE_LABEL_ID } from '../../constants';

type Props = {
  googleLanguageId?: string;
  voice: Nullable<VoiceSelectOption>;
  onVoiceChange: (voice: VoiceSelectOption) => void;
};

const TranslateVoiceSettings = ({
  googleLanguageId,
  voice,
  onVoiceChange,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const { data, isFetching, error } = useGet<
    ApiDataCollection<VoiceDTO>,
    Voice[]
  >(`/v1/google/languages/${googleLanguageId}/voices`, (fetchedData) =>
    voiceDataParser(fetchedData),
  );

  const voiceOptions = useMemo(
    () => data?.map(voiceByGoogleLanguageIdSelectFormatter) ?? [],
    [data],
  );

  useEffect(() => {
    onVoiceChange(voiceOptions[0]);
  }, [voiceOptions]);

  const voicePreviewValidation = () => voice && voice.id !== null;
  const renderVoiceSettings = () => (
    <Row align="end" gap={40}>
      <Column>
        <Text id={DESTINATION_VOICE_LABEL_ID}>
          <FormattedMessage {...messages.voiceType} />
        </Text>
        <Select
          // @ts-ignore
          mt={5}
          selectProps={{
            options: voiceOptions,
            value: voice,
            onChange: onVoiceChange,
            placeholder: formatMessage(messages.selectVoice),
            'aria-labelledby': DESTINATION_VOICE_LABEL_ID,
          }}
        />
      </Column>
      <Column>
        <TextVoicePreviewInput
          boxPx={0}
          boxPy={0}
          placeholder={formatMessage(messages.testVoice)}
          styles={{ height: 45, width: '100%', pr: 42 }}
          previewButtonInsideInput
          phoneticPreviewParams={{ google_tts_voice_id: voice?.id }}
          previewValidation={voicePreviewValidation}
        />
      </Column>
    </Row>
  );

  const renderNoNarratorText = () => (
    <Text mb={50} fontSize={fontSizes.regular} color={themeColors.warning}>
      <FormattedMessage {...messages.noNarrator} />
    </Text>
  );

  return isFetching ? (
    <Spinner color={themeColors.secondary} size={66} />
  ) : (
    <>
      {error ? (
        // @ts-ignore
        <ErrorAlert errorText={error} />
      ) : (
        <>
          {voiceOptions.length ? renderVoiceSettings() : renderNoNarratorText()}
        </>
      )}
    </>
  );
};

export default TranslateVoiceSettings;
