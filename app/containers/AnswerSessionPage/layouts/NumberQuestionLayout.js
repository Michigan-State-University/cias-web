import React, { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { fontSizes, themeColors } from 'theme';

import { numericValidator } from 'utils/validators';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Row from 'components/Row';
import Column from 'components/Column';
import Text from 'components/Text';

import messages from './messages';
import { QUESTION_SUBTITLE_ID, QUESTION_TITLE_ID } from '../constants';

const NumberQuestionLayout = ({
  onChange,
  answerBody,
  onValidation,
  minLength,
  maxLength,
  disabled,
}) => {
  const { formatMessage } = useIntl();
  const value = answerBody && answerBody.value ? answerBody.value : '';

  const [touched, setTouched] = useState(false);

  const markupContent = useMemo(() => {
    if (minLength !== null && maxLength !== null)
      return formatMessage(messages.numericQuestionDigitsBetween, {
        minLength,
        maxLength,
      });
    if (minLength !== null)
      return formatMessage(messages.numericQuestionDigitsMinimum, {
        minLength,
      });
    if (maxLength !== null)
      return formatMessage(messages.numericQuestionDigitsMaximum, {
        maxLength,
      });
    return null;
  }, [minLength, maxLength]);

  const hasError = useMemo(() => {
    const valueLength = value.toString().length;
    if (!isNullOrUndefined(minLength)) {
      if (valueLength < minLength) {
        return true;
      }
    }
    if (!isNullOrUndefined(maxLength)) {
      if (valueLength > maxLength) {
        return true;
      }
    }
    return false;
  }, [value, minLength, maxLength]);

  const handleChange = (...props) => {
    setTouched(true);
    onChange(...props);
  };

  const showError = hasError && touched;

  return (
    <Column>
      <Box
        bg={themeColors.highlight}
        width="100%"
        maxWidth={150}
        px={21}
        py={14}
      >
        <Row>
          <ApprovableInput
            width="100%"
            mr={0}
            height={50}
            type="singleline"
            keyboard="tel"
            value={value}
            placeholder={formatMessage(messages.numberPlaceholder)}
            validator={numericValidator}
            onValidation={onValidation}
            onCheck={handleChange}
            aria-labelledby={`${QUESTION_TITLE_ID} ${QUESTION_SUBTITLE_ID}`}
            disabled={disabled}
            styles={{ hasError: showError }}
          />
        </Row>
      </Box>
      {markupContent && (
        <Text
          mt={5}
          fontSize={fontSizes.small}
          color={showError ? themeColors.alert : themeColors.comment}
          fontWeight={showError ? 'bold' : 'normal'}
        >
          <Markup content={markupContent} noWrap />
        </Text>
      )}
    </Column>
  );
};

NumberQuestionLayout.propTypes = {
  onChange: PropTypes.func,
  answerBody: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onValidation: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
};

export default memo(NumberQuestionLayout);
