import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import check from 'assets/svg/checkbox-checked-green.svg';
import cross from 'assets/svg/cross-closing.svg';
import 'react-quill/dist/quill.bubble.css';
import Column from '../Column';
import Row from '../Row';
import Img from '../Img';
import Box from '../Box';
import { Input } from './index';
import { QuillStyled } from './styled';
import { TextArea } from './TextArea';

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
  } = props;
  const [value, setValue] = useState(propsValue);
  const [focused, setfocused] = useState(false);
  const quillRef = useRef();

  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);

  const onInputChange = targetValue => {
    if (validator && validator(targetValue)) {
      setValue(targetValue);
    } else if (!validator) setValue(targetValue);
  };

  const checkIfQuillToolbarVisible = () => {
    const { current } = quillRef;
    if (!current || !current.editingArea) return false;
    const tooltipElements = current.editingArea.getElementsByClassName(
      'ql-tooltip',
    );
    if (!tooltipElements || tooltipElements.length === 0) return false;
    return tooltipElements[0].classList.contains('ql-hidden');
  };

  const onBlur = () => {
    if (checkIfQuillToolbarVisible() || type !== 'richText') {
      setfocused(false);
      setValue(propsValue);
    }
  };

  const renderInput = () => {
    if (type === 'richText')
      return (
        <QuillStyled
          ref={quillRef}
          theme="bubble"
          value={value}
          placeholder={placeholder}
          onFocus={() => setfocused(true)}
          onChange={v => onInputChange(v)}
          onBlur={onBlur}
          modules={quillModules}
          bounds="#quill_boundaries"
          focused={focused}
        />
      );
    if (type === 'multiLine')
      return (
        <TextArea
          width="98%"
          height="60px"
          {...(rows ? { rows, height: 'auto' } : {})}
          mr={9}
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
        mr={9}
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
      <Box hidden={!focused}>
        <Column height="100%" justify={type === 'singleline' && 'between'}>
          <Row mb={type === 'multiline' && 4}>
            <Img src={check} onMouseDown={() => onCheck(value)} clickable />
          </Row>
          <Row>
            <Img src={cross} clickable />
          </Row>
        </Column>
      </Box>
    </Row>
  );
};

ApprovableInput.propTypes = {
  value: PropTypes.string,
  onCheck: PropTypes.func,
  rows: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['multiline', 'singleline', 'richText']),
  keyboard: PropTypes.string,
  validator: PropTypes.func,
  textAlign: PropTypes.string,
};

ApprovableInput.defaultProps = {
  type: 'richText',
};

export default ApprovableInput;
