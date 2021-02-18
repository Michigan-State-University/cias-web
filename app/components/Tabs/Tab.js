import React from 'react';
import PropTypes from 'prop-types';

import { LabelContainer, LinkContainer } from './styled';

const Tab = ({
  label,
  text,
  renderAsLink: LinkComponent,
  onClick,
  activeTab,
  linkMatch,
}) => {
  const handleClick = () => {
    onClick(linkMatch ?? text);
  };

  if (label)
    return (
      <LabelContainer isActive={activeTab === text || activeTab === linkMatch}>
        <div onClick={handleClick}>{label}</div>
      </LabelContainer>
    );

  if (LinkComponent)
    return (
      <LinkContainer isActive={activeTab === text || activeTab === linkMatch}>
        <div onClick={handleClick}>{LinkComponent}</div>
      </LinkContainer>
    );

  return null;
};

Tab.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  activeTab: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  renderAsLink: PropTypes.node,
  linkMatch: PropTypes.string,
};

export default Tab;
