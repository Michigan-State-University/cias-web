import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-quill/dist/quill.bubble.css';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import isNumber from 'lodash/isNumber';

import useOutsideClick from 'utils/useOutsideClick';

import Column from '../Column';
import Row from '../Row';
import { Input } from './index';
import { DatePickerWrapper, QuillStyled } from './styled';
import { TextArea } from './TextArea';
import DateInput from './DateInput';

import './QuillSinglelineHandler';

const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['link'],
    ['blockquote'],
    [{ script: 'sub' }, { script: 'super' }],
    [{ header: 1 }, { header: 2 }],
    [{ color: [] }, { background: [] }],
  ],
};

const quillModulesSingleline = {
  ...quillModules,
  keyboard: {
    bindings: {
      enter: {
        key: 13,
        handler: () => false,
      },
    },
  },
  clipboard: {
    newLines: false,
  },
};

const ApprovableInput = props => {
  const {
    value: propsValue,
    validator,
    onValidation,
    placeholder,
    textAlign,
    keyboard,
    type,
    onCheck,
    onFocus,
    rows,
    richText,
    autoSize,
    fontSize,
    mr,
    disabled,
    height,
    width,
    padding,
    defaultFontSize,
    styles,
    minDate,
  } = props;
  const [value, setValue] = useState(propsValue);
  const [focused, setFocused] = useState(false);
  const ref = useRef();

  const blur = () => {
    const instance = ref.current;

    switch (instance.constructor) {
      case ReactQuill:
        instance.editor.blur();
        break;
      case HTMLElement:
      default:
        instance.blur();
        break;
    }
  };

  useOutsideClick(ref, blur, focused);

  const blockQuillBlur = () => {
    const preventDefault = event => event.preventDefault();
    const toolbar = ref.current.editor.container.querySelector('.ql-toolbar');

    const block = () => toolbar.addEventListener('mousedown', preventDefault);
    const clean = () =>
      toolbar.removeEventListener('mousedown', preventDefault);

    block();

    return clean;
  };

  useEffect(() => {
    if (richText && focused) {
      const clean = blockQuillBlur();

      return clean;
    }
  }, [focused, ref.current]);

  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);

  const onInputChange = targetValue => {
    if (!validator) setValue(targetValue);
    else {
      const validationResult = validator(targetValue);

      if (validationResult) setValue(targetValue);

      if (onValidation) onValidation(validationResult);
    }
  };

  const onBlur = () => {
    if (!disabled) {
      setFocused(false);
      onCheck(value);
    }
  };

  const handleFocus = event => {
    setFocused(true);
    if (onFocus) onFocus(event);
  };

  const renderInput = () => {
    if (richText)
      return (
        <QuillStyled
          ref={ref}
          theme="bubble"
          value={value}
          placeholder={placeholder}
          onFocus={() => handleFocus(ref.current)}
          onChange={v => onInputChange(v)}
          onBlur={onBlur}
          modules={type === 'multiline' ? quillModules : quillModulesSingleline}
          bounds="#quill_boundaries"
          focused={disabled ? false : focused}
          autoSize={autoSize}
          singleline={type === 'singleline'}
          fontSize={fontSize}
          readOnly={disabled}
          defaultFontSize={defaultFontSize}
        />
      );

    if (type === 'multiline')
      return (
        <TextArea
          ref={ref}
          width="100%"
          height="60px"
          {...(rows ? { rows, height: 'auto' } : {})}
          mr={isNumber(mr) ? mr : 9}
          value={value}
          onChange={event => onInputChange(event.target.value)}
          onFocus={handleFocus}
          onBlur={onBlur}
          placeholder={props.placeholder}
          transparent
          disabled={disabled}
        />
      );
    if (type === 'date')
      return (
        <DatePickerWrapper>
          <DatePicker
            ref={ref}
            disabled={disabled}
            minDate={minDate}
            selected={value}
            onChange={date => onCheck(date)}
            onFocus={onFocus}
            placeholderText={placeholder}
            dateFormat="MM/dd/yyyy"
            customInput={
              <DateInput
                disabled={disabled}
                fontSize={fontSize}
                height={height}
                width={width}
                ref={ref}
                inputStyles={styles}
              />
            }
            showMonthDropdown
            showYearDropdown
            calendarClassName="schedule-date-picker"
            popperModifiers={{
              preventOverflow: {
                padding: 10,
              },
            }}
            popperProps={{
              positionFixed: true,
            }}
          />
        </DatePickerWrapper>
      );
    return (
      <Input
        ref={ref}
        height={height || 60}
        mr={isNumber(mr) ? mr : 9}
        textAlign={textAlign}
        value={value}
        onChange={event => onInputChange(event.target.value)}
        onFocus={handleFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        keyboard={keyboard}
        transparent
        disabled={disabled}
        fontSize={fontSize}
        padding={padding}
        {...styles}
      />
    );
  };

  return (
    <Row width="100%">
      <Column>{renderInput()}</Column>
    </Row>
  );
};

ApprovableInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onCheck: PropTypes.func,
  onFocus: PropTypes.func,
  rows: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['multiline', 'singleline', 'date']),
  keyboard: PropTypes.string,
  validator: PropTypes.func,
  onValidation: PropTypes.func,
  textAlign: PropTypes.string,
  richText: PropTypes.bool,
  autoSize: PropTypes.bool,
  fontSize: PropTypes.number,
  mr: PropTypes.number,
  disabled: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  padding: PropTypes.number,
  defaultFontSize: PropTypes.number,
  minDate: PropTypes.object,
  styles: PropTypes.object,
};

ApprovableInput.defaultProps = {
  type: 'multiline',
  richText: false,
  autoSize: false,
};

export default ApprovableInput;
