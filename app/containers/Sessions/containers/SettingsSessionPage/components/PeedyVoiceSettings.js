import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { themeColors } from 'theme';
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
import ErrorAlert from 'components/ErrorAlert';
import Spinner from 'components/Spinner';
import TextVoicePreviewInput from 'components/Input/TextVoicePreviewInput';

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
}) => {
  const [selectedLanguage, setSelectLanguage] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState({
    value: googleVoiceId,
    label: voiceLabel,
  });

  const inputStyles = {
    height: '100%',
    width: '100%',
  };

  useEffect(() => {
    if (data === null) {
      fetchLanguages();
    }
  }, []);

  useEffect(() => {
    setSelectedVoice({
      value: googleVoiceId,
      label: voiceLabel,
    });
  }, [googleVoiceId, voiceLabel]);

  const onVoicesChange = () => {
    if (selectedLanguage && selectedLanguage.value) {
      const languageVoices = ttsVoices[selectedLanguage.value];
      if (languageVoices && languageVoices.data) {
        if (
          languageVoices.data.findIndex(
            ({ value }) => value === selectedVoice.value,
          ) === -1
        ) {
          setSelectedVoice(languageVoices.data[0]);
        }
      }
    }
  };

  useEffect(() => {
    if (selectedLanguage && selectedLanguage.value) {
      const languageVoices = ttsVoices[selectedLanguage.value];
      if (languageVoices === undefined) {
        fetchLanguageVoices(selectedLanguage.value);
      }
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (ttsVoices) {
      onVoicesChange();
    }
  }, [ttsVoices]);

  useEffect(() => {
    if (data && data.length > 0) {
      const foundLanguage = data.find(
        ({ value }) => value === googleTtsLanguageId,
      );
      setSelectLanguage(foundLanguage);
    }
  }, [data, googleTtsLanguageId]);

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
          placeholder: formatMessage(messages.voiceLanguage),
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
          placeholder: formatMessage(messages.voiceType),
        }}
      />
    );
  };

  const setSessionVoices = () => {
    editSession({ path: 'google_tts_voice_id', value: selectedVoice.value }, [
      'google_tts_voice_id',
    ]);
  };

  const voicePreviewValidation = () =>
    selectedVoice !== null && selectedVoice.value !== null;

  return (
    <>
      <H3 mt={30} mb={20}>
        {formatMessage(messages.voiceSettings)}
      </H3>
      <Text mb={5}>{formatMessage(messages.voiceLanguage)}</Text>
      {getLanguagesPanel()}
      {selectedLanguage !== null && (
        <>
          <Text mt={10} mb={5}>
            {formatMessage(messages.voiceType)}
          </Text>
          {getVoicesPanel()}
        </>
      )}
      {editingPossible && (
        <TextVoicePreviewInput
          boxPx={0}
          boxPy={0}
          placeholder={formatMessage(messages.testVoice)}
          styles={inputStyles}
          phoneticPreviewParams={{ google_tts_voice_id: selectedVoice?.value }}
          previewValidation={voicePreviewValidation}
        />
      )}
      {selectedVoice.value !== googleVoiceId && (
        <Button
          onClick={setSessionVoices}
          width={200}
          mt={10}
          alignSelf="center"
          disabled={!editingPossible}
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
  ttsLanguages: PropTypes.object,
  ttsVoices: PropTypes.object,
  googleTtsVoice: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  ttsLanguages: makeSelectLanguagesState(),
  ttsVoices: makeSelectVoicesState(),
});

const mapDispatchToProps = {
  fetchLanguages: fetchLanguagesRequest,
  fetchLanguageVoices: fetchLanguageVoiceRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectReducer({ key: 'ttsLanguages', reducer: ttsLanguageReducer }),
  injectSaga({
    key: 'ttsLanguagesSagas',
    saga: allLanguagesSagas,
  }),
  withConnect,
)(PeedyVoiceSettings);
