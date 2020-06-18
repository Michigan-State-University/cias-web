import React from 'react';
import PropTypes from 'prop-types';

import { LabelContainer } from './styled';

const Tab = ({ label, onClick, activeTab }) => {
  const handleClick = () => {
    onClick(label);
  };

  return (
    <LabelContainer isActive={activeTab === label} onClick={handleClick}>
      {label}
    </LabelContainer>
  );
};

Tab.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default Tab;
