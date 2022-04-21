import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Row from 'components/Row';
import { numericValidator } from 'utils/validators';
import { themeColors } from 'theme';

import messages from './messages';
import { QUESTION_SUBTITLE_ID, QUESTION_TITLE_ID } from '../constants';

const NumberQuestionLayout = ({ onChange, answerBody, onValidation }) => {
  const { formatMessage } = useIntl();
  const value = answerBody && answerBody.value ? answerBody.value : '';

  return (
    <Box bg={themeColors.highlight} width="100%" maxWidth={150} px={21} py={14}>
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
          onCheck={onChange}
          aria-labelledby={`${QUESTION_TITLE_ID} ${QUESTION_SUBTITLE_ID}`}
        />
      </Row>
    </Box>
  );
};

NumberQuestionLayout.propTypes = {
  onChange: PropTypes.func,
  answerBody: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onValidation: PropTypes.func,
};

export default memo(NumberQuestionLayout);
