import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import check from 'assets/svg/checkbox-checked.svg';
import cross from 'assets/svg/cross.svg';
import { Input } from '.';
import Column from '../Column';
import Row from '../Row';
import Img from '../Img';

const BigInput = props => {
  const [value, setValue] = useState(props.value);
  return (
    <Fragment>
      <Column>
        <Input
          {...props}
          height="50px"
          mr={9}
          value={value}
          onChange={event => setValue(event.target.value)}
          transparent
        />
      </Column>
      <Column justify="between">
        <Row>
          <Img src={check} onClick={() => props.onCheck(value)} />
        </Row>
        <Row>
          <Img src={cross} />
        </Row>
      </Column>
    </Fragment>
  );
};

BigInput.propTypes = {
  value: PropTypes.string,
  onCheck: PropTypes.func,
};

export default BigInput;
