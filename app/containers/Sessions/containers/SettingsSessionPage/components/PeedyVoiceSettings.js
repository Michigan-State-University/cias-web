import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  fetchLanguagesRequest,
  ttsLanguageReducer,
  makeSelectLanguagesState,
  allLanguagesSagas,
  fetchLanguageVoiceRequest,
  makeSelectVoicesState,
} from 'global/reducers/ttsLanguages';
import H3 from 'components/H3';
import Select from 'components/Select';
import Text from 'components/Text';
import Button from 'components/Button';

import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import ErrorAlert from 'components/ErrorAlert';
import Spinner from 'components/Spinner';
import { themeColors } from 'theme';
import TextVoicePreviewInput from 'components/Input/TextVoicePreviewInput';
import {
  allAudioPreviewSagas,
  AudioPreviewReducer,
  makeSelectAudioPreviewState,
  phoneticPreviewRequest,
  resetPhoneticPreview,
} from 'global/reducers/audioPreview';
import messages from './messages';

const PeedyVoiceSettings = ({
  editingPossible,
  formatMessage,
  fetchLanguages,
  ttsLanguages: { data, loading, error },
  ttsVoices,
  fetchLanguageVoices,
  googleTtsVoice: { id: googleVoiceId, googleTtsLanguageId, voiceLabel },
  editSession,
  audioPreviewRequest,
  audioPreview: { phoneticUrl, phoneticLoading },
  resetAudioPreview,
}) => {
  const [selectedLanguage, setSelectLanguage] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState({
    value: googleVoiceId,
    label: voiceLabel,
  });
  const [previewText, setPreviewText] = useState('');

  const inputStyles = {
    height: '100%',
    width: '100%',
  };

  useEffect(() => {
    resetAudioPreview();
    if (data === null) {
      fetchLanguages();
    }
  }, []);

  useEffect(() => {
    if (selectedLanguage && selectedLanguage.value) {
      const languageVoices = ttsVoices[selectedLanguage.value];
      if (languageVoices === undefined) {
        fetchLanguageVoices(selectedLanguage.value);
      }
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (data && data.length > 0) {
      const foundLanguage = data.find(
        ({ value }) => value === googleTtsLanguageId,
      );
      setSelectLanguage(foundLanguage);
    }
  }, [data]);

  useEffect(() => {
    if (previewText.length !== 0 && selectedVoice && selectedVoice.value) {
      audioPreviewRequest(previewText, {
        google_tts_voice_id: selectedVoice.value,
      });
    }
  }, [previewText, selectedVoice]);

  const getLanguagesPanel = () => {
    if (loading) {
      return <Spinner color={themeColors.secondary} />;
    }
    if (error) {
      return <ErrorAlert errorText={error} />;
    }
    return (
      <Select
        width="100%"
        selectProps={{
          isDisabled: !editingPossible,
          options: data,
          value: selectedLanguage,
          onChange: setSelectLanguage,
          placeholder: formatMessage(messages.peedyLanguage),
        }}
      />
    );
  };

  const getVoicesPanel = () => {
    if (!selectedLanguage || !selectedLanguage.value) return null;
    const languageVoices = ttsVoices[selectedLanguage.value];
    if (!languageVoices) return null;
    const { loading: voicesLoading, data: voicesData } = languageVoices;
    if (voicesLoading) {
      return <Spinner color={themeColors.secondary} />;
    }

    return (
      <Select
        mb={10}
        width="100%"
        selectProps={{
          isDisabled: !editingPossible,
          options: voicesData,
          value: selectedVoice,
          onChange: setSelectedVoice,
          placeholder: formatMessage(messages.peedyVoiceType),
        }}
      />
    );
  };

  const setSessionVoices = () => {
    editSession({ path: 'google_tts_voice_id', value: selectedVoice.value }, [
      'google_tts_voice_id',
    ]);
  };

  const handlePhoneticNameChange = value => {
    setPreviewText(value);
  };

  return (
    <>
      <H3 mt={30} mb={20}>
        {formatMessage(messages.voiceSettings)}
      </H3>
      <Text mb={5}>{formatMessage(messages.peedyLanguage)}</Text>
      {getLanguagesPanel()}
      {selectedLanguage !== null && (
        <>
          <Text mt={10} mb={5}>
            {formatMessage(messages.peedyVoiceType)}
          </Text>
          {getVoicesPanel()}
        </>
      )}
      {editingPossible && (
        <TextVoicePreviewInput
          boxPx={0}
          boxPy={0}
          phoneticUrl={phoneticUrl}
          phoneticLoading={phoneticLoading}
          placeholder={formatMessage(messages.testVoice)}
          onBlur={handlePhoneticNameChange}
          styles={inputStyles}
        />
      )}
      {selectedVoice.value !== googleVoiceId && (
        <Button
          onClick={setSessionVoices}
          width={200}
          mt={10}
          alignSelf="center"
        >
          {formatMessage(messages.saveVoiceSettings)}
        </Button>
      )}
    </>
  );
};

PeedyVoiceSettings.propTypes = {
  editingPossible: PropTypes.bool,
  formatMessage: PropTypes.func,
  fetchLanguages: PropTypes.func,
  fetchLanguageVoices: PropTypes.func,
  editSession: PropTypes.func,
  audioPreviewRequest: PropTypes.func,
  resetAudioPreview: PropTypes.func,
  ttsLanguages: PropTypes.object,
  ttsVoices: PropTypes.object,
  googleTtsVoice: PropTypes.object,
  audioPreview: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  ttsLanguages: makeSelectLanguagesState(),
  ttsVoices: makeSelectVoicesState(),
  audioPreview: makeSelectAudioPreviewState(),
});

const mapDispatchToProps = {
  fetchLanguages: fetchLanguagesRequest,
  fetchLanguageVoices: fetchLanguageVoiceRequest,
  audioPreviewRequest: phoneticPreviewRequest,
  resetAudioPreview: resetPhoneticPreview,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectReducer({ key: 'ttsLanguages', reducer: ttsLanguageReducer }),
  injectReducer({ key: 'audioPreview', reducer: AudioPreviewReducer }),
  injectSaga({
    key: 'ttsLanguagesSagas',
    saga: allLanguagesSagas,
  }),
  injectSaga({
    key: 'audioPreview',
    saga: allAudioPreviewSagas,
  }),
  withConnect,
)(PeedyVoiceSettings);
