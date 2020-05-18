import styled from 'styled-components';
import PropTypes from 'prop-types';

const Margin = component => styled(component)`
  margin-top: ${props => props.mt}px;
  margin-bottom: ${props => props.mb}px;
  margin-right: ${props => props.mr}px;
  margin-left: ${props => props.ml}px;
`;

Margin.propTypes = {
  mt: PropTypes.number,
  mb: PropTypes.number,
  mr: PropTypes.number,
  ml: PropTypes.number,
};

Margin.defaultProps = {
  mt: 0,
  mb: 0,
  mr: 0,
  ml: 0,
};

export { Margin };
