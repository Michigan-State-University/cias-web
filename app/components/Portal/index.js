/**
 *
 * Portal
 *
 */

import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';

const Portal = ({ children, id }) => {
  const component = useMemo(() => document.getElementById(id), [id]);

  return createPortal(children, component);
};

Portal.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};

Portal.defaultProps = {
  id: 'main-app-container',
};

export default memo(Portal);
