import React from 'react';
import PropTypes from 'prop-types';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Row from 'components/Row';
import { themeColors } from 'theme';

// The DB contains two date formats:
//   * "Mon May 11 2026" — historical (Date#toDateString), the format we write
//   * "2026-05-11"      — written between 2026-04-10 and CIAS-4177 fix deploy
const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

const parseLocalDate = (raw) => {
  if (!raw) return null;
  const iso = raw.match(ISO_DATE);
  if (iso) return new Date(+iso[1], +iso[2] - 1, +iso[3]);
  const legacy = new Date(raw);
  return Number.isNaN(legacy.getTime()) ? null : legacy;
};

const DateQuestionLayout = ({ onChange, answerBody, disabled }) => {
  const value = parseLocalDate(answerBody?.value);

  return (
    <Box width="100%" padding={15}>
      <Row>
        <ApprovableInput
          disabled={disabled}
          width={200}
          height={50}
          type="date"
          value={value}
          onCheck={onChange}
          fontSize={15}
          styles={{
            border: !disabled && `3px solid ${themeColors.primary}`,
            mx: 10,
          }}
        />
      </Row>
    </Box>
  );
};

DateQuestionLayout.propTypes = {
  onChange: PropTypes.func,
  answerBody: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
};

export default DateQuestionLayout;
