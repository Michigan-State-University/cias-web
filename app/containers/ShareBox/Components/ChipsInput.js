import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { error } from 'react-toastify-redux';
import { injectIntl, intlShape } from 'react-intl';

import Box from 'components/Box';
import Img from 'components/Img';
import Row from 'components/Row';
import deleteIcon from 'assets/svg/delete.svg';
import { colors } from 'theme';
import { emailValidator } from 'utils/validators/emailValidator';

import useOutsideClick from 'utils/useOutsideClick';
import messages from '../messages';
import { INVALID_EMAIL_ERROR, DUPLICATED_EMAIL_ERROR } from '../constants';
import { StyledChipsInput, HiddenInput } from '../styled';

const ChipsInput = ({
  value,
  setValue,
  showError,
  placeholder,
  intl: { formatMessage },
}) => {
  const hiddenInput = useRef(null);
  const chipsInput = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const setFocus = () => setIsFocused(true);
  const unsetFocus = () => setIsFocused(false);

  useOutsideClick(chipsInput, unsetFocus, isFocused);

  const handleKeyDown = event => {
    const { key, keyCode } = event;
    handleChange({ key, keyCode })(event);
  };

  const handleChange = ({ key, keyCode }) => ({
    target: { value: inputEmailValue },
  }) => {
    const lastChar = inputEmailValue[inputEmailValue.length - 1];
    if (
      lastChar === ',' ||
      lastChar === ' ' ||
      (key === 'Enter' && keyCode === 13)
    ) {
      const newEmail = inputEmailValue.trim().replace(',', '');
      const isAlreadyExist = find(value, email => email === newEmail);
      const isValid = emailValidator.isValidSync(newEmail);
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
      if (isEmpty(value)) setValue([newEmail]);
      else setValue([...value, newEmail]);

      setInputValue('');
    } else setInputValue(inputEmailValue);
  };

  const handleFocus = () => {
    setFocus();
    const { current } = hiddenInput;
    if (current) current.focus();
  };
  const handleRemove = email => event => {
    event.stopPropagation();
    setValue(value.filter(val => val !== email));
  };

  const isInputFilled = !isEmpty(value);
  return (
    <StyledChipsInput
      isInputFilled={isInputFilled}
      isFocused={isFocused}
      onClick={handleFocus}
      ref={chipsInput}
      mt={-5}
    >
      <Row flexWrap="wrap" width="100%">
        {map(value, (email, index) => (
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
          onChange={handleChange({})}
          onKeyDown={handleKeyDown}
          placeholder={isInputFilled ? null : placeholder}
          isInputFilled={isInputFilled}
        />
      </Row>
    </StyledChipsInput>
  );
};

ChipsInput.propTypes = {
  value: PropTypes.array,
  setValue: PropTypes.func,
  intl: intlShape,
  showError: PropTypes.func,
  placeholder: PropTypes.string,
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
