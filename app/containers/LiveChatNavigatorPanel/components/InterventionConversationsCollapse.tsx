import React, { useState } from 'react';

import { InterventionConversation } from 'models/LiveChat';
import Collapse from 'components/Collapse';
import H3 from 'components/H3';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';

type Props = {
  interventionConversation: InterventionConversation;
  children: React.ReactNode;
  isFirst: boolean;
};

const InterventionConversationCollapse = ({
  interventionConversation: { interventionName },
  children,
  isFirst,
}: Props) => {
  const [openCollapsible, setOpenCollapsible] = useState(isFirst);
  const toggleCollapsible = () => setOpenCollapsible(!openCollapsible);
  return (
    <Collapse
      isOpened={openCollapsible}
      onToggle={toggleCollapsible}
      onHideImg={arrowDown}
      onShowImg={arrowUp}
      px={10}
      label={<H3>{interventionName}</H3>}
      bgOpacity={0}
    >
      {children}
    </Collapse>
  );
};

export default InterventionConversationCollapse;
