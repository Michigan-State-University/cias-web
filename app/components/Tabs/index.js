import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';

import Tab from './Tab';
import { TabsContainer, ContentContainer } from './styled';

const Tabs = ({ children }) => {
  const { label: initialLabel } = children[0].props;
  const [activeTab, setActiveTab] = useState(initialLabel);

  const onClickTabItem = tab => {
    setActiveTab(tab);
  };

  return (
    <TabsContainer>
      <Row>
        {children.map(child => {
          const { label } = child.props;
          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </Row>
      <ContentContainer>
        {children.map(child => {
          const { label, children: content } = child.props;
          if (label !== activeTab) return null;
          return content;
        })}
      </ContentContainer>
    </TabsContainer>
  );
};

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

export default Tabs;
