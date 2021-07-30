/**
 *
 * TranslateLanguageSettings
 *
 */

import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { themeColors } from 'theme';
import H2 from 'components/H2';
import Row from 'components/Row';
import Column from 'components/Column';
import PopularOptionsSelect from 'components/Select/PopularOptionsSelect';

import messages from './messages';

const TranslateLanguageSettings = ({
  languageOptions: sourceLanguageOptions,
  sourceLanguage,
  onSourceLanguageChange,
  destinationLanguage,
  onDestinationLanguageChange,
}) => {
  const { formatMessage } = useIntl();

  const destinationLanguageOptions = useMemo(
    () =>
      sourceLanguage
        ? sourceLanguageOptions.filter(
            (language) =>
              language.googleLanguageId !== sourceLanguage.googleLanguageId,
          )
        : sourceLanguageOptions,
    [sourceLanguageOptions, sourceLanguage],
  );

  const handleSourceLanguageChange = (newSourceLanguage) => {
    onSourceLanguageChange(newSourceLanguage);
    if (
      newSourceLanguage?.googleLanguageId ===
      destinationLanguage?.googleLanguageId
    ) {
      onDestinationLanguageChange(null);
    }
  };

  return (
    <>
      <Row align="end">
        <Column>
          <FormattedMessage {...messages.sourceLanguage} />
          <PopularOptionsSelect
            mt={5}
            selectProps={{
              options: sourceLanguageOptions,
              value: sourceLanguage,
              onChange: handleSourceLanguageChange,
              placeholder: formatMessage(messages.searchLanguage),
            }}
            popularOptionsValues={['en', 'es', 'zh', 'fr']}
          />
        </Column>
        <Column mx={15} height={45} width="auto" justify="center">
          <H2 color={themeColors.primary}>-</H2>
        </Column>
        <Column>
          <FormattedMessage {...messages.destinationLanguage} />
          <PopularOptionsSelect
            mt={5}
            selectProps={{
              options: destinationLanguageOptions,
              value: destinationLanguage,
              onChange: onDestinationLanguageChange,
              placeholder: formatMessage(messages.searchLanguage),
            }}
            popularOptionsValues={['en', 'es', 'zh', 'fr']}
          />
        </Column>
      </Row>
    </>
  );
};

TranslateLanguageSettings.propTypes = {
  languageOptions: PropTypes.array,
  sourceLanguage: PropTypes.object,
  onSourceLanguageChange: PropTypes.func,
  destinationLanguage: PropTypes.object,
  onDestinationLanguageChange: PropTypes.func,
};

export default TranslateLanguageSettings;
