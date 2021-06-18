import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Column from 'components/Column';
import H3 from 'components/H3';
import Input from 'components/Input';
import Text from 'components/Text';
import { colors, themeColors } from 'theme';

import messages from '../messages';
import { changeEmailInput } from '../actions';

const InviteForm = ({
  email,
  formatMessage,
  isValid,
  onInputChange,
  handleKeyDown,
}) => {
  const [error, setError] = useState(null);

  const handleChange = ({ target: { value } }) => {
    setError(null);
    onInputChange(value);
  };
  const handleBlur = valid => () => {
    if (!valid) setError(formatMessage(messages.invalidEmail));
  };

  return (
    <>
      <H3 mb={20}>
        <FormattedMessage {...messages.sendInvite} />
      </H3>
      <Column width="100%" mb={35}>
        <Text mb={10} fontSize={14}>
          <FormattedMessage {...messages.sectionTitle} />
        </Text>
        <Input
          maxWidth="none"
          width="100%"
          transparent={false}
          bg={colors.linkWater}
          placeholder={formatMessage(messages.inputPlaceholder)}
          value={email}
          onChange={handleChange}
          onBlur={handleBlur(isValid)}
          onKeyDown={handleKeyDown}
        />
        {error && (
          <Text mt={5} color={themeColors.warning} fontWeight="bold">
            {error}
          </Text>
        )}
      </Column>
    </>
  );
};

InviteForm.propTypes = {
  formatMessage: PropTypes.func,
  isValid: PropTypes.bool,
  email: PropTypes.string,
  onInputChange: PropTypes.func,
  handleKeyDown: PropTypes.func,
};

const mapDispatchToProps = {
  onInputChange: changeEmailInput,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);
export default compose(withConnect)(InviteForm);
