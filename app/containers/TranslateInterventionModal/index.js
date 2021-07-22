/**
 *
 * TranslateInterventionModal
 *
 */

import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { fontSizes, themeColors } from 'theme';
import H1 from 'components/H1';
import H2 from 'components/H2';
import Text from 'components/Text';
import Comment from 'components/Text/Comment';
import Row from 'components/Row';
import Box from 'components/Box';
import { StyledButton } from 'components/Button/StyledButton';
import Loader from 'components/Loader';
import ErrorAlert from 'components/ErrorAlert';
import useGet from 'utils/useGet';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import { languageSelectOptionFormatter } from 'utils/formatters';

import TranslateLanguageSettings from './components/TranslateLanguageSettings';
import messages from './messages';

const TranslateInterventionModal = ({ name, googleLanguageId }) => {
  const [sourceLanguage, setSourceLanguage] = useState(null);
  const [destinationLanguage, setDestinationLanguage] = useState(null);

  const { data, isFetching, error } = useGet(
    '/v1/google/languages',
    fetchedData => jsonApiToArray(fetchedData, 'supportedLanguage'),
  );

  const languageOptions = useMemo(
    () => data?.map(languageSelectOptionFormatter) ?? [],
    [data],
  );

  useEffect(() => {
    const matchedSourceLanguage = languageOptions.find(
      language => language.googleLanguageId === `${googleLanguageId}`,
    );
    setSourceLanguage(matchedSourceLanguage);
  }, [googleLanguageId, languageOptions]);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      <H2 mb={10} color={themeColors.primary}>
        {name}
      </H2>
      <H1 mb={20}>
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
      {!error && (
        <TranslateLanguageSettings
          languageOptions={languageOptions}
          sourceLanguage={sourceLanguage}
          onSourceLanguageChange={setSourceLanguage}
          destinationLanguage={destinationLanguage}
          onDestinationLanguageChange={setDestinationLanguage}
        />
      )}
      {error && (
        <Box>
          <ErrorAlert errorText={error} />
        </Box>
      )}
      <Row mt={50}>
        <Comment width="100%">
          <FormattedMessage {...messages.costsComment} />
        </Comment>
        <StyledButton ml={20} width={200}>
          <FormattedMessage {...messages.translate} />
        </StyledButton>
      </Row>
    </>
  );
};

TranslateInterventionModal.propTypes = {
  name: PropTypes.string.isRequired,
  googleLanguageId: PropTypes.number,
};

export default TranslateInterventionModal;
