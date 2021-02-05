import React from 'react';
import PropTypes from 'prop-types';

import Box from 'components/Box';
import Row from 'components/Row';
import PhoneNumberForm from 'components/AccountSettings/PhoneNumberForm';
import { colors } from 'theme';

const PhoneQuestionLayout = ({ onChange, formatMessage, answerBody }) => {
  const value = answerBody && answerBody.value;
  const { number, iso, prefix } = value ?? {};

  return (
    <Box
      bgOpacity={0}
      width="100%"
      px={21}
      py={14}
      border={`1px solid ${colors.casper}`}
    >
      <Row>
        <PhoneNumberForm
          formatMessage={formatMessage}
          phone={{
            number,
            prefix,
            iso,
            confirmed: true,
          }}
          changePhoneNumber={onChange}
          error={null}
          loading={false}
          changeErrorValue={null}
        />
      </Row>
    </Box>
  );
};

PhoneQuestionLayout.propTypes = {
  onChange: PropTypes.func,
  formatMessage: PropTypes.func,
  answerBody: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default PhoneQuestionLayout;
