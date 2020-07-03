import React from 'react';
import PropTypes from 'prop-types';

import { LabelContainer, LinkContainer } from './styled';

const Tab = ({
  label,
  text,
  renderAsLink: LinkComponent,
  onClick,
  activeTab,
}) => {
  const handleClick = () => {
    onClick(text);
  };

  if (label)
    return (
      <LabelContainer isActive={activeTab === text}>
        <div onClick={handleClick}>{label}</div>
      </LabelContainer>
    );

  if (LinkComponent)
    return (
      <LinkContainer isActive={activeTab === text}>
        <div onClick={handleClick}>{LinkComponent}</div>
      </LinkContainer>
    );

  return null;
};

Tab.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  activeTab: PropTypes.string,
  text: PropTypes.string,
  renderAsLink: PropTypes.node,
};

export default Tab;
