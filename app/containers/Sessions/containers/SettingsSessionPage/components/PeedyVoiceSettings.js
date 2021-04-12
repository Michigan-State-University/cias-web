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
import messages from './messages';

const PeedyVoiceSettings = ({
  editingPossible,
  formatMessage,
  fetchLanguages,
  ttsLanguages: { data, loading, error },
  ttsVoices,
  fetchLanguageVoices,
}) => {
  const [selectedLanguage, setSelectLanguage] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    if (data === null) {
      fetchLanguages();
    }
  }, []);

  useEffect(() => {
    if (selectedLanguage !== null) {
      const languageVoices = ttsVoices[selectedLanguage.value];
      if (languageVoices === undefined) {
        fetchLanguageVoices(selectedLanguage.value);
      }
    }
  }, [selectedLanguage]);

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
    const languageVoices = ttsVoices[selectedLanguage.value];
    if (!languageVoices) return null;
    const { loading: voicesLoading, data: voicesData } = languageVoices;
    if (voicesLoading) {
      return <Spinner color={themeColors.secondary} />;
    }

    return (
      <Select
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
      {selectedLanguage !== null && (
        <Button width={200} mt={10} alignSelf="center">
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
  ttsLanguages: PropTypes.object,
  ttsVoices: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  ttsLanguages: makeSelectLanguagesState(),
  ttsVoices: makeSelectVoicesState(),
});

const mapDispatchToProps = {
  fetchLanguages: fetchLanguagesRequest,
  fetchLanguageVoices: fetchLanguageVoiceRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({
  key: 'ttsLanguagesSagas',
  saga: allLanguagesSagas,
});

export default compose(
  injectReducer({ key: 'ttsLanguages', reducer: ttsLanguageReducer }),
  withConnect,
  withSaga,
)(PeedyVoiceSettings);
