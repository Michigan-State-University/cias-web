import React, { useState, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import map from 'lodash/map';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { error } from 'react-toastify-redux';
import { injectIntl, intlShape } from 'react-intl';

import Box from 'components/Box';
import Img from 'components/Img';
import Row from 'components/Row';
import deleteIcon from 'assets/svg/delete.svg';
import outsideClickHandler from 'utils/outsideClickHandler';
import { colors } from 'theme';

import messages from '../messages';
import { INVALID_EMAIL_ERROR, DUPLICATED_EMAIL_ERROR } from '../constants';
import { StyledChipsInput, HiddenInput } from '../styled';
import { validEmailRegExp } from '../utils';

const ChipsInput = ({
  value,
  setValue,
  showError,
  intl: { formatMessage },
}) => {
  const hiddenInput = useRef(null);
  const chipsInput = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const trimmedEmails = useMemo(() => {
    if (value) {
      const emails = value.split(',');
      return emails.map(email => email.trim());
    }
    return null;
  }, [value]);

  const setFocus = () => setIsFocused(true);
  const unsetFocus = () => setIsFocused(false);

  const handleChange = ({ target: { value: inputEmailValue } }) => {
    const lastChar = inputEmailValue[inputEmailValue.length - 1];
    if (lastChar === ',' || lastChar === ' ') {
      const newEmail = inputEmailValue.trim().replace(',', '');
      const isAlreadyExist = find(trimmedEmails, email => email === newEmail);
      const isValid = validEmailRegExp.test(newEmail);
      if (isAlreadyExist) {
        showError(formatMessage(messages.duplicatedEmail), {
          id: DUPLICATED_EMAIL_ERROR,
        });
        return;
      }
      if (!isValid) {
        showError(formatMessage(messages.invalidEmail), {
          id: INVALID_EMAIL_ERROR,
        });
        return;
      }
      if (value) setValue(value.concat(',', newEmail));
      else setValue(newEmail);
      setInputValue('');
    } else setInputValue(inputEmailValue);
  };

  const handleFocus = () => {
    setFocus();
    const { current } = hiddenInput;
    if (current) current.focus();
  };

  useEffect(() => {
    if (isFocused) {
      const cleanUp = outsideClickHandler(chipsInput, unsetFocus);

      return cleanUp;
    }
  }, [isFocused]);

  const isInputFilled = !!trimmedEmails;

  const handleRemove = email => () => {
    const lastCommaIndex = value.lastIndexOf(',');
    const emailIndex = value.indexOf(email);
    let valueToDelete;
    if (lastCommaIndex === -1) valueToDelete = email;
    else if (lastCommaIndex < emailIndex) valueToDelete = `,${email}`;
    else valueToDelete = `${email},`;
    setValue(value.replace(valueToDelete, '').trim());
  };

  const placeholder = isInputFilled
    ? null
    : formatMessage(messages.emailPlaceholder);
  return (
    <StyledChipsInput
      isInputFilled={isInputFilled}
      isFocused={isFocused}
      onClick={handleFocus}
      ref={chipsInput}
      mt={-5}
    >
      <Row flexWrap="wrap">
        {map(trimmedEmails, (email, index) => (
          <Box key={`el-email-${index}`} px={2} mb={5}>
            <Row
              width="fit-content"
              bg={colors.white}
              borderRadius={5}
              border={`1px solid ${colors.linkWater}`}
              px={15}
              py={5}
            >
              <span>{email}</span>
              <Img
                src={deleteIcon}
                alt="delete"
                ml={8}
                clickable
                onClick={handleRemove(email)}
              />
            </Row>
          </Box>
        ))}
        <HiddenInput
          ref={hiddenInput}
          onFocus={setFocus}
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          isInputFilled={isInputFilled}
        />
      </Row>
    </StyledChipsInput>
  );
};

ChipsInput.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  intl: intlShape,
  showError: PropTypes.func,
};

const mapDispatchToProps = {
  showError: error,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
)(ChipsInput);
