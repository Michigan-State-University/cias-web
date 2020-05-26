import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import check from 'assets/svg/checkbox-checked-green.svg';
import cross from 'assets/svg/cross-closing.svg';
import Column from '../Column';
import Row from '../Row';
import Img from '../Img';
import Box from '../Box';
import { TextArea } from './TextArea';

const ApprovableInput = props => {
  const [value, setValue] = useState(props.value);
  const [focused, setfocused] = useState(false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Fragment>
      <Column>
        <TextArea
          height="60px"
          {...(props.rows ? { rows: props.rows, height: 'auto' } : {})}
          mr={9}
          value={value}
          onChange={event => setValue(event.target.value)}
          onFocus={() => setfocused(true)}
          onBlur={() => {
            setfocused(false);
            setValue(props.value);
          }}
          transparent
        />
      </Column>
      <Box hidden={!focused}>
        <Column height="100%">
          <Row mb={4}>
            <Img
              src={check}
              onMouseDown={() => props.onCheck(value)}
              clickable
            />
          </Row>
          <Row>
            <Img src={cross} clickable />
          </Row>
        </Column>
      </Box>
    </Fragment>
  );
};

ApprovableInput.propTypes = {
  value: PropTypes.string,
  onCheck: PropTypes.func,
  rows: PropTypes.string,
};

export default ApprovableInput;
