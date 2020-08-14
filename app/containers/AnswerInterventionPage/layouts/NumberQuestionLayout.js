import React from 'react';
import PropTypes from 'prop-types';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Row from 'components/Row';
import { numericValidator } from 'utils/validators';
import { themeColors } from 'theme';

import messages from './messages';

const NumberQuestionLayout = ({
  onChange,
  formatMessage,
  answerBody,
  onValidation,
}) => {
  const value =
    answerBody && answerBody.value ? answerBody.value.toString() : '';

  return (
    <Box bg={themeColors.highlight} width="100%" maxWidth={150} px={21} py={14}>
      <Row>
        <ApprovableInput
          width="100%"
          mr={0}
          type="singleline"
          keyboard="tel"
          value={value}
          placeholder={formatMessage(messages.numberPlaceholder)}
          validator={numericValidator}
          onValidation={onValidation}
          onCheck={onChange}
        />
      </Row>
    </Box>
  );
};

NumberQuestionLayout.propTypes = {
  onChange: PropTypes.func,
  formatMessage: PropTypes.func,
  answerBody: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onValidation: PropTypes.func,
};

export default NumberQuestionLayout;
