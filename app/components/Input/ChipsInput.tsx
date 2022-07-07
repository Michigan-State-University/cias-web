import React, { useState, useRef, useEffect } from 'react';
import find from 'lodash/find';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import Box from 'components/Box';
import Img from 'components/Img';
import Row from 'components/Row';
import deleteIcon from 'assets/svg/delete.svg';
import { colors } from 'theme';
import { emailValidator } from 'utils/validators/emailValidator';

import useOutsideClick from 'utils/useOutsideClick';
import messages from './messages';
import { StyledChipsInput, HiddenInput } from './styled';

const INVALID_EMAIL_ERROR =
  'app/components/Input/ChipsInput/INVALID_EMAIL_ERROR';
const DUPLICATED_EMAIL_ERROR =
  'app/components/Input/ChipsInput/DUPLICATED_EMAIL_ERROR';

type Props = {
  value: string[];
  setValue: (newValues: string[]) => void;
  placeholder: string;
  disabled?: boolean;
  onIsValid: (isValid: boolean) => void;
  compact?: boolean;
};

const ChipsInput = ({
  value,
  setValue,
  placeholder,
  onIsValid,
  disabled = false,
  compact = false,
}: Props) => {
  const hiddenInput = useRef<HTMLInputElement>(null);
  const chipsInput = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { formatMessage } = useIntl();

  const setFocus = () => setIsFocused(true);
  const unsetFocus = () => setIsFocused(false);

  useOutsideClick(chipsInput, unsetFocus, isFocused);

  useEffect(() => {
    if (isEmpty(value) && onIsValid) {
      onIsValid(false);
    }
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, keyCode } = event;
    handleChange({ key, keyCode })(event as any);
  };

  const handleChange =
    ({ key, keyCode }: { key?: string; keyCode?: number }) =>
    ({
      target: { value: inputEmailValue },
    }: React.ChangeEvent<HTMLInputElement>) => {
      if (key === 'Backspace' || keyCode === 8) {
        if (value.length !== 0 && inputEmailValue.length === 0) {
          setValue(value.slice(0, -1));
          return;
        }
      }

      const lastChar = inputEmailValue[inputEmailValue.length - 1];
      if (
        lastChar === ',' ||
        lastChar === ' ' ||
        (key === 'Enter' && keyCode === 13)
      ) {
        const newEmail = inputEmailValue.trim().replace(',', '');
        const isAlreadyExist = find(value, (email) => email === newEmail);
        const isValid = emailValidator(newEmail);
        if (isAlreadyExist) {
          toast.error(formatMessage(messages.duplicatedEmail), {
            toastId: DUPLICATED_EMAIL_ERROR,
          });
          return;
        }
        if (!isValid) {
          toast.error(formatMessage(messages.invalidEmail), {
            toastId: INVALID_EMAIL_ERROR,
          });
          return;
        }
        if (isEmpty(value)) setValue([newEmail]);
        else setValue([...value, newEmail]);
        setInputValue('');
      } else {
        setInputValue(inputEmailValue);
        const isValid = emailValidator(inputEmailValue);
        const isInputValueEmpty = isEmpty(inputEmailValue);
        const isValueEmpty = isEmpty(value);
        if (isInputValueEmpty && isValueEmpty && onIsValid) onIsValid(false);
        else if (onIsValid && isValueEmpty) onIsValid(isValid);
      }
    };

  const handleBlur = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    const inputElement = target;
    const { value: inputEmailValue } = inputElement;

    const isValid = emailValidator(inputEmailValue);
    if (isValid) {
      if (isEmpty(value)) setValue([inputEmailValue]);
      else setValue([...value, inputEmailValue]);
      setInputValue('');
    }
  };

  const handleFocus = () => {
    setFocus();
    const { current } = hiddenInput;
    if (current) current.focus();
  };
  const handleRemove =
    (email: string) => (event: React.FocusEvent<HTMLInputElement>) => {
      event.stopPropagation();
      setValue(value.filter((val) => val !== email));
    };

  const isInputFilled = !isEmpty(value);
  return (
    <StyledChipsInput
      isInputFilled={isInputFilled}
      isFocused={isFocused}
      onClick={() => !disabled && handleFocus()}
      ref={chipsInput}
      mt={-5}
      compact={compact}
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
          data-cy="hidden-input"
          disabled={disabled}
          ref={hiddenInput}
          onFocus={setFocus}
          type="text"
          value={inputValue}
          onChange={handleChange({})}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          onBlur={handleBlur}
          isInputFilled={isInputFilled}
        />
      </Row>
    </StyledChipsInput>
  );
};

export default ChipsInput;
