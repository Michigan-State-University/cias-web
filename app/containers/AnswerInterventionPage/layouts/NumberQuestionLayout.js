import React from 'react';
import PropTypes from 'prop-types';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Row from 'components/Row';
import { numericValidator } from 'utils/validators';
import { themeColors } from 'theme';

import messages from './messages';

const NumberQuestionLayout = ({ onChange, formatMessage, answerBody }) => {
  const value =
    answerBody && answerBody.payload ? answerBody.payload.toString() : '';
  return (
    <Box bg={themeColors.highlight} width="100%" px={21} py={14}>
      <Row>
        <ApprovableInput
          width="100%"
          mr={0}
          type="singleline"
          keyboard="tel"
          value={value}
          placeholder={formatMessage(messages.numberPlaceholder)}
          validator={numericValidator}
          onCheck={onChange}
        />
      </Row>
    </Box>
  );
};

NumberQuestionLayout.propTypes = {
  onChange: PropTypes.func,
  formatMessage: PropTypes.func,
  answerBody: PropTypes.string,
};

export default NumberQuestionLayout;
