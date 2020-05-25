import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import check from 'assets/svg/checkbox-checked.svg';
import cross from 'assets/svg/cross.svg';
import Column from '../Column';
import Row from '../Row';
import Img from '../Img';
import Box from '../Box';
import { TextArea } from './TextArea';

const ApprovableInput = props => {
  const [value, setValue] = useState(props.value);
  const [focused, setfocused] = useState(false);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Fragment>
      <Column>
        <TextArea
          height="50px"
          {...(props.rows ? { rows: props.rows, height: 'auto' } : {})}
          mr={9}
          value={value}
          onChange={event => setValue(event.target.value)}
          onFocus={() => setfocused(true)}
          onBlur={() => setfocused(false)}
          transparent
        />
      </Column>
      <Box hidden={!focused}>
        <Column height="100%">
          <Row mb={9}>
            <Img src={check} onMouseDown={() => props.onCheck(value)} />
          </Row>
          <Row>
            <Img src={cross} />
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
