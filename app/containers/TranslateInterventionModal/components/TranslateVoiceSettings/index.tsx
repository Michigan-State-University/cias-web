/**
 *
 * TranslateVoiceSettings
 *
 */

import React, { ElementType, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import useGet from 'utils/useGet';
import {
  voiceByGoogleLanguageIdSelectFormatter,
  VoiceSelectOption,
} from 'utils/formatters';
import {
  allAudioPreviewSagas,
  AudioPreviewReducer,
  makeSelectAudioPreviewState,
  phoneticPreviewRequest,
  resetPhoneticPreview,
} from 'global/reducers/audioPreview';
import { Voice, VoiceDTO } from 'global/types/voice';

import { fontSizes, themeColors } from 'theme';
import Text from 'components/Text';
import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';
import Select from 'components/Select';
import Column from 'components/Column';
import Row from 'components/Row';
import TextVoicePreviewInput from 'components/Input/TextVoicePreviewInput';

import messages from './messages';
import { voiceDataParser } from './utils';
import { DESTINATION_VOICE_LABEL_ID } from '../../constants';

type Props = {
  googleLanguageId?: string;
  voice: Nullable<VoiceSelectOption>;
  onVoiceChange: (voice: VoiceSelectOption) => void;
  audioPreviewRequest: typeof phoneticPreviewRequest;
  // @ts-ignore
  audioPreview;
  resetAudioPreview: typeof resetPhoneticPreview;
};

const TranslateVoiceSettings = ({
  googleLanguageId,
  voice,
  onVoiceChange,
  audioPreviewRequest,
  audioPreview: { phoneticUrl, phoneticLoading },
  resetAudioPreview,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const [previewText, setPreviewText] = useState('');

  const { data, isFetching, error } = useGet<VoiceDTO, Voice[]>(
    `/v1/google/languages/${googleLanguageId}/voices`,
    (fetchedData) => voiceDataParser(fetchedData),
  );

  const voiceOptions = useMemo(
    () => data?.map(voiceByGoogleLanguageIdSelectFormatter) ?? [],
    [data],
  );

  useEffect(() => {
    onVoiceChange(voiceOptions[0]);
  }, [voiceOptions]);

  useEffect(() => {
    resetAudioPreview();
  }, []);

  const loadPreview = () => {
    if (previewText.length !== 0 && voice && voice.value) {
      audioPreviewRequest(previewText, {
        google_tts_voice_id: voice.id,
      });
    }
  };

  useEffect(() => {
    loadPreview();
  }, [previewText, voice]);

  const renderVoiceSettings = () => (
    <Row align="end" gap={40}>
      <Column>
        <Text id={DESTINATION_VOICE_LABEL_ID}>
          <FormattedMessage {...messages.voiceType} />
        </Text>
        <Select
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
          // @ts-ignore
          boxPx={0}
          boxPy={0}
          phoneticUrl={phoneticUrl}
          phoneticLoading={phoneticLoading}
          placeholder={formatMessage(messages.testVoice)}
          onTextReady={setPreviewText}
          styles={{ height: 45, width: '100%', pr: 42 }}
          previewButtonInsideInput
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

const mapDispatchToProps = {
  audioPreviewRequest: phoneticPreviewRequest,
  resetAudioPreview: resetPhoneticPreview,
};

const mapStateToProps = createStructuredSelector({
  audioPreview: makeSelectAudioPreviewState(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose<ElementType>(
  injectReducer({ key: 'audioPreview', reducer: AudioPreviewReducer }),
  injectSaga({
    key: 'audioPreview',
    saga: allAudioPreviewSagas,
  }),
  withConnect,
)(TranslateVoiceSettings);
