import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.bubble.css';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import isNumber from 'lodash/isNumber';

import useOutsideClick from 'utils/useOutsideClick';
import { formatMessage } from 'utils/intlOutsideReact';

import { LocalizedDatePicker } from 'components/DatePicker';

import Column from '../Column';
import Row from '../Row';
import { Input } from './index';
import { QuillStyled } from './styled';
import { TextArea } from './TextArea';
import messages from './messages';
import './QuillSinglelineHandler';
import { DateInput } from './DateInput';

const quillModules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link'],
      ['blockquote'],
      [{ script: 'sub' }, { script: 'super' }],
      [{ header: 1 }, { header: 2 }],
      [{ color: [] }, { background: [] }],
      [{ align: '' }, { align: 'right' }],
    ],
    handlers: {
      link(value) {
        if (value) {
          // eslint-disable-next-line no-alert,no-param-reassign
          value = prompt(formatMessage(messages.quillLinkLabel));
        }

        this.quill.format('link', value);
      },
    },
  },
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

const ApprovableInput = ({
  value: propsValue,
  validator,
  onValidation,
  placeholder,
  textAlign,
  keyboard,
  type,
  onValueChange,
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
  maxDate,
  ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  id,
  transparent,
  selectsStart,
  selectsEnd,
  startDate,
  endDate,
  richTextBlurTransparentBorder,
}) => {
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
    const preventDefault = (event) => event.preventDefault();
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

  useEffect(() => {
    if (onValueChange) onValueChange(value);
  }, [value, onValueChange]);

  useLayoutEffect(() => {
    if (type === 'multiline' && !richText) {
      adjustTextAreaHeight();
    }
  }, []);

  const onInputChange = (targetValue) => {
    if (!validator) setValue(targetValue);
    else {
      const validationResult = validator(targetValue);

      if (validationResult) setValue(targetValue);

      if (onValidation) onValidation(validationResult);
    }
  };

  const adjustTextAreaHeight = () => {
    if (autoSize) {
      const computed = window.getComputedStyle(ref.current);

      ref.current.style.height = '0px';
      const { scrollHeight } = ref.current;

      const computedHeightAdditions =
        parseInt(computed.getPropertyValue('border-top-width'), 10) +
        parseInt(computed.getPropertyValue('padding-top'), 10) +
        parseInt(computed.getPropertyValue('padding-bottom'), 10) +
        parseInt(computed.getPropertyValue('border-bottom-width'), 10);

      ref.current.style.height = `${scrollHeight + computedHeightAdditions}px`;
    }
  };

  const onTextAreaChange = (e) => {
    const textAreaValue = e.target.value;

    adjustTextAreaHeight();
    onInputChange(textAreaValue);
  };

  const onBlur = () => {
    if (!disabled) {
      setFocused(false);
      onCheck(value);
    }
  };

  const handleFocus = (event) => {
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
          onChange={(v) => onInputChange(v)}
          onBlur={onBlur}
          modules={type === 'multiline' ? quillModules : quillModulesSingleline}
          bounds="#quill_boundaries"
          focused={disabled ? false : focused}
          autoSize={autoSize}
          singleline={type === 'singleline'}
          fontSize={fontSize}
          readOnly={disabled}
          defaultFontSize={defaultFontSize}
          blurTransparentBorder={richTextBlurTransparentBorder}
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
          onChange={onTextAreaChange}
          onFocus={handleFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          transparent={transparent}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          id={id}
        />
      );
    if (type === 'date')
      return (
        <LocalizedDatePicker
          ref={ref}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          selected={value}
          onChange={(date) => onCheck(date)}
          onFocus={onFocus}
          placeholderText={placeholder ?? 'MM/DD/YYYY'}
          dateFormat="MM/dd/yyyy"
          selectsEnd={selectsEnd}
          selectsStart={selectsStart}
          startDate={startDate}
          endDate={endDate}
          customInput={
            <DateInput
              disabled={disabled}
              fontSize={fontSize}
              height={height}
              width={width}
              {...styles}
              ref={ref}
            />
          }
          showMonthDropdown
          showYearDropdown
          calendarClassName="schedule-date-picker"
          strictParsing
        />
      );
    return (
      <Input
        ref={ref}
        height={height || 60}
        mr={isNumber(mr) ? mr : 9}
        textAlign={textAlign}
        value={value}
        onChange={(event) => onInputChange(event.target.value)}
        onFocus={handleFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        keyboard={keyboard}
        transparent={transparent}
        disabled={disabled}
        fontSize={fontSize}
        padding={padding}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        id={id}
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
  onValueChange: PropTypes.func,
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
  maxDate: PropTypes.object,
  styles: PropTypes.object,
  ariaLabel: PropTypes.string,
  'aria-labelledby': PropTypes.string,
  id: PropTypes.string,
  transparent: PropTypes.bool,
  selectsStart: PropTypes.bool,
  selectsEnd: PropTypes.bool,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  richTextBlurTransparentBorder: PropTypes.bool,
};

ApprovableInput.defaultProps = {
  type: 'multiline',
  richText: false,
  autoSize: false,
  transparent: true,
  richTextBlurTransparentBorder: true,
};

export default ApprovableInput;
