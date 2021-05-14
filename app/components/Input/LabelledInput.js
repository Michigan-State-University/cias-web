import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Col, Container, Row } from 'components/ReactGridSystem';
import Comment from 'components/Text/Comment';
import StyledInput from 'components/Input/StyledInput';
import Icon from 'components/Icon';
import EditIcon from 'assets/svg/edit.svg';

const LabelledInput = ({
  label,
  placeholder,
  value,
  onBlur,
  inputProps,
  ...style
}) => (
  <Container margin="0 !important" {...style}>
    <Row justify="between" align="center">
      <Col>
        <Row align="center">
          <Comment fontWeight="bold">{label}</Comment>
        </Row>
        <Row align="center">
          <StyledInput
            placeholder={placeholder}
            type="singleline"
            value={value}
            onBlur={onBlur}
            fontSize={15}
            mr={8}
            ml={-12}
            {...inputProps}
          />
          <Icon src={EditIcon} />
        </Row>
      </Col>
    </Row>
  </Container>
);

LabelledInput.propTypes = {
  style: PropTypes.object,
  inputProps: PropTypes.object,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default memo(LabelledInput);
