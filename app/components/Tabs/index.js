import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';

import Tab from './Tab';
import { TabsContainer, ContentContainer } from './styled';

// rendering labels as links should be used with a `controlled` prop
const Tabs = ({
  children,
  controlled,
  controlledTabActive,
  controlledSetTabActive,
  ...restProps
}) => {
  const {
    label: initialLabel,
    renderAsLink: initialRenderAsLink,
  } = children[0].props;

  const [activeTab, setActiveTab] = useState(
    initialLabel || initialRenderAsLink.props.children,
  );

  const onClickTabItem = tab => {
    if (controlled) controlledSetTabActive(tab);
    else setActiveTab(tab);
  };

  const tab = controlled ? controlledTabActive : activeTab;

  return (
    <TabsContainer {...restProps}>
      <Row>
        {children.map(child => {
          const { label, renderAsLink } = child.props;
          return (
            <Tab
              activeTab={tab}
              key={label || renderAsLink.props.children}
              text={label || renderAsLink.props.children}
              label={label}
              renderAsLink={renderAsLink}
              onClick={onClickTabItem}
            />
          );
        })}
      </Row>
      <ContentContainer>
        {children.map(child => {
          const { label, children: content } = child.props;
          if (label !== tab) return null;
          return content;
        })}
      </ContentContainer>
    </TabsContainer>
  );
};

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  controlled: PropTypes.bool,
  controlledTabActive: PropTypes.string,
  controlledSetTabActive: PropTypes.func,
};

export default Tabs;
