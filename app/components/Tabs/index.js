import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { colors } from 'theme';
import Row from 'components/Row';

import Tab from './Tab';
import { TabsContainer, ContentContainer } from './styled';

// rendering labels as links should be used with a `controlled` prop
const Tabs = ({
  children,
  controlled,
  controlledTabActive,
  controlledSetTabActive,
  containerProps,
  withBottomBorder,
  emphasizeActiveLink,
  labelStyle,
  ...restProps
}) => {
  const { label: initialLabel, renderAsLink: initialRenderAsLink } =
    children.find((child) => !child.hidden).props;

  const [activeTab, setActiveTab] = useState(
    initialLabel || initialRenderAsLink.props.children,
  );

  const onClickTabItem = (tab) => {
    if (controlled) controlledSetTabActive(tab);
    else setActiveTab(tab);
  };

  const tab = controlled ? controlledTabActive : activeTab;
  return (
    <TabsContainer {...restProps}>
      <Row
        data-cy="tabs"
        align="end"
        {...(withBottomBorder
          ? { borderBottom: `1px solid ${colors.linkWater}`, pb: 4 }
          : {})}
      >
        {children.map((child) => {
          if (!child || !child.props) return null;
          const { label, renderAsLink, hidden, linkMatch } = child.props;

          if (hidden) return null;

          return (
            <Tab
              activeTab={tab}
              key={label || renderAsLink.props.to}
              text={label || renderAsLink.props.children}
              label={label}
              renderAsLink={renderAsLink}
              linkMatch={linkMatch}
              onClick={onClickTabItem}
              emphasizeActiveLink={emphasizeActiveLink}
              labelStyle={labelStyle}
            />
          );
        })}
      </Row>
      <ContentContainer {...containerProps}>
        {children.map((child) => {
          if (!child || !child.props) return null;

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
  controlledTabActive: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  controlledSetTabActive: PropTypes.func,
  containerProps: PropTypes.object,
  withBottomBorder: PropTypes.bool,
  emphasizeActiveLink: PropTypes.bool,
  labelStyle: PropTypes.object,
};

Tabs.defaultProps = {
  withBottomBorder: false,
  emphasizeActiveLink: false,
};

export default Tabs;
