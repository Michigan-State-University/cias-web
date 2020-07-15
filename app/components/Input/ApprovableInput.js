import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.bubble.css';

import isNumber from 'lodash/isNumber';
import Column from '../Column';
import Row from '../Row';
import { Input } from './index';
import { QuillStyled } from './styled';
import { TextArea } from './TextArea';

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
    placeholder,
    textAlign,
    keyboard,
    type,
    onCheck,
    rows,
    richText,
    autoSize,
    fontSize,
    mr,
  } = props;
  const [value, setValue] = useState(propsValue);
  const [focused, setfocused] = useState(false);
  const quillRef = useRef();

  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);

  const onInputChange = targetValue => {
    if (validator && validator(targetValue)) setValue(targetValue);
    else if (!validator) setValue(targetValue);
  };

  const onBlur = () => {
    setfocused(false);
    onCheck(value);
  };

  const renderInput = () => {
    if (richText)
      return (
        <QuillStyled
          ref={quillRef}
          theme="bubble"
          value={value}
          placeholder={placeholder}
          onFocus={() => setfocused(true)}
          onChange={v => onInputChange(v)}
          onBlur={onBlur}
          modules={type === 'multiline' ? quillModules : quillModulesSingleline}
          bounds="#quill_boundaries"
          focused={focused}
          autoSize={autoSize}
          singleline={type === 'singleline'}
          fontSize={fontSize}
        />
      );

    if (type === 'multiline')
      return (
        <TextArea
          width="100%"
          height="60px"
          {...(rows ? { rows, height: 'auto' } : {})}
          mr={isNumber(mr) ? mr : 9}
          value={value}
          onChange={event => onInputChange(event.target.value)}
          onFocus={() => setfocused(true)}
          onBlur={onBlur}
          placeholder={props.placeholder}
          transparent
        />
      );

    return (
      <Input
        height="60px"
        mr={isNumber(mr) ? mr : 9}
        textAlign={textAlign}
        value={value}
        onChange={event => onInputChange(event.target.value)}
        onFocus={() => setfocused(true)}
        onBlur={onBlur}
        placeholder={placeholder}
        keyboard={keyboard}
        transparent
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
  value: PropTypes.string,
  onCheck: PropTypes.func,
  rows: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['multiline', 'singleline']),
  keyboard: PropTypes.string,
  validator: PropTypes.func,
  textAlign: PropTypes.string,
  richText: PropTypes.bool,
  autoSize: PropTypes.bool,
  fontSize: PropTypes.number,
  mr: PropTypes.number,
};

ApprovableInput.defaultProps = {
  type: 'multiline',
  richText: false,
  autoSize: false,
};

export default ApprovableInput;
