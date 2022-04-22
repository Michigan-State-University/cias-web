/**
 *
 * TranslateInterventionModal
 *
 */

import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';

import { Language, LanguageDTO } from 'models/Language';
import { ApiData } from 'models/Api';

import { fontSizes, themeColors } from 'theme';

import useGet from 'utils/useGet';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import {
  languageSelectOptionFormatter,
  LanguageSelectOption,
  VoiceSelectOption,
} from 'utils/formatters';
import {
  translateInterventionRequest,
  interventionReducer,
  translateInterventionSaga,
  makeSelectInterventionLoader,
  makeSelectInterventionError,
} from 'global/reducers/intervention';

import H1 from 'components/H1';
import H2 from 'components/H2';
import Text from 'components/Text';
import Comment from 'components/Text/Comment';
import Row from 'components/Row';
import Button from 'components/Button';
import Loader from 'components/Loader';
import ErrorAlert from 'components/ErrorAlert';
import { MODAL_TITLE_ID } from 'components/Modal';

import TranslateLanguageSettings from './components/TranslateLanguageSettings';
import TranslateVoiceSettings from './components/TranslateVoiceSettings';
import messages from './messages';

type Props = {
  id: string;
  name: string;
  googleLanguageId: number;
  onTranslated?: () => void;
  translateInterventionLoading: boolean;
  translateInterventionError: boolean;
  translateIntervention: typeof translateInterventionRequest;
};

const TranslateInterventionModal = ({
  id,
  name,
  googleLanguageId,
  onTranslated,
  translateInterventionLoading,
  translateInterventionError,
  translateIntervention,
}: Props): JSX.Element => {
  const [sourceLanguage, setSourceLanguage] =
    useState<Nullable<LanguageSelectOption>>(null);
  const [destinationLanguage, setDestinationLanguage] =
    useState<Nullable<LanguageSelectOption>>(null);
  const [voice, setVoice] = useState<Nullable<VoiceSelectOption>>(null);
  const [submitted, setSubmitted] = useState(false);

  const { data, isFetching, error } = useGet<ApiData<LanguageDTO>, Language[]>(
    '/v1/google/languages',
    (fetchedData) => jsonApiToArray(fetchedData, 'supportedLanguage'),
  );

  const languageOptions = useMemo(
    () => data?.map(languageSelectOptionFormatter) ?? [],
    [data],
  );

  useEffect(() => {
    const matchedSourceLanguage = languageOptions.find(
      (language) => language.googleLanguageId === `${googleLanguageId}`,
    );
    setSourceLanguage(matchedSourceLanguage ?? null);
  }, [googleLanguageId, languageOptions]);

  useEffect(() => {
    const translatedSuccessfully =
      submitted && !translateInterventionLoading && !translateInterventionError;
    if (translatedSuccessfully && onTranslated) {
      onTranslated();
    }
  }, [submitted, translateInterventionLoading, translateInterventionError]);

  const handleTranslate = () => {
    if (destinationLanguage) {
      translateIntervention(
        id,
        destinationLanguage.googleLanguageId,
        voice?.id,
      );
      setSubmitted(true);
    }
  };

  if (isFetching) {
    // @ts-ignore
    return <Loader />;
  }

  return (
    <>
      <H2 mb={10} color={themeColors.primary}>
        {name}
      </H2>
      <H1 mb={20} id={MODAL_TITLE_ID}>
        <FormattedMessage {...messages.title} />
      </H1>
      <Text mb={50} fontSize={fontSizes.regular}>
        <FormattedMessage {...messages.subtitle} />
      </Text>
      <H2 mb={10}>
        <FormattedMessage {...messages.translationSettings} />
      </H2>
      <Comment mb={20}>
        <FormattedMessage {...messages.translationSettingsComment} />
      </Comment>
      {error ? (
        // @ts-ignore
        <ErrorAlert errorText={error} />
      ) : (
        <TranslateLanguageSettings
          languageOptions={languageOptions}
          sourceLanguage={sourceLanguage}
          onSourceLanguageChange={setSourceLanguage}
          destinationLanguage={destinationLanguage}
          onDestinationLanguageChange={setDestinationLanguage}
        />
      )}
      {destinationLanguage && (
        <>
          <H2 mt={50} mb={10}>
            <FormattedMessage {...messages.voiceSettings} />
          </H2>
          <Comment mb={20}>
            <FormattedMessage {...messages.voiceSettingsComment} />
          </Comment>
          <TranslateVoiceSettings
            googleLanguageId={destinationLanguage.googleLanguageId}
            voice={voice}
            onVoiceChange={setVoice}
          />
        </>
      )}
      <Row mt={50}>
        <Comment width="100%">
          <FormattedMessage {...messages.costsComment} />
        </Comment>
        {
          // @ts-ignore
          <Button
            ml={20}
            width={200}
            onClick={handleTranslate}
            disabled={!destinationLanguage}
            loading={translateInterventionLoading}
          >
            <FormattedMessage {...messages.translate} />
          </Button>
        }
      </Row>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  translateInterventionLoading: makeSelectInterventionLoader(
    'translateInterventionLoading',
  ),
  translateInterventionError: makeSelectInterventionError(
    'translateInterventionError',
  ),
});

const mapDispatchToProps = {
  translateIntervention: translateInterventionRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  injectSaga({ key: 'translateIntervention', saga: translateInterventionSaga }),
  injectReducer({ key: 'intervention', reducer: interventionReducer }),
)(TranslateInterventionModal);
