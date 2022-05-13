import React from 'react';
import PropTypes from 'prop-types';

import { LabelContainer, LinkContainer, TabUnderline } from './styled';

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

  const isActive = activeTab === text || activeTab === linkMatch;

  if (label)
    return (
      <LabelContainer isActive={isActive}>
        <div onClick={handleClick}>{label}</div>
        {isActive && <TabUnderline layoutId="Tab-LabelContainer-underline" />}
      </LabelContainer>
    );

  if (LinkComponent)
    return (
      <LinkContainer isActive={isActive}>
        <div onClick={handleClick}>{LinkComponent}</div>
        {isActive && <TabUnderline layoutId="Tab-LinkContainer-underline" />}
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
