import React, { useState, useRef, useEffect } from 'react';

import { colors } from 'theme';

import Collapse from 'components/Collapse';
import { EllipsisText } from 'components/Text';
import Box from 'components/Box';
import { CircleCounter } from 'components/CircleCounter';

import useResizeObserver from 'utils/useResizeObserver';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';

import { LabelRow } from './styled';

type Props = {
  interventionName: string;
  children: React.ReactNode;
  isFirst: boolean;
  unreadConversationsCount: number;
};

const COUNTER_WIDTH = 25;
const EMPTY_SPACE = 5;

const InterventionConversationCollapse = ({
  interventionName,
  children,
  isFirst,
  unreadConversationsCount,
}: Props) => {
  const [openCollapsible, setOpenCollapsible] = useState(isFirst);
  const toggleCollapsible = () => setOpenCollapsible(!openCollapsible);
  const hasUnreadConversations = Boolean(unreadConversationsCount);

  const labelRef = useRef();
  const { width: interventionNameWidth } = useResizeObserver({
    targetRef: labelRef,
    onResize: undefined,
  });

  const [interventionNameMaxWidth, setInterventionNameMaxWidth] =
    useState<number>();

  useEffect(() => {
    if (interventionNameWidth) {
      const margin = hasUnreadConversations
        ? COUNTER_WIDTH + EMPTY_SPACE
        : EMPTY_SPACE;
      const newWidth = interventionNameWidth - margin;
      setInterventionNameMaxWidth(newWidth);
    }
  }, [hasUnreadConversations, interventionNameWidth]);

  return (
    <Box borderBottom={`1px solid ${colors.linkWater}`} borderRadius="0">
      <Collapse
        isOpened={openCollapsible}
        onToggle={toggleCollapsible}
        onHideImg={arrowDown}
        onShowImg={arrowUp}
        px={0}
        py={16}
        height="auto"
        label={
          <LabelRow
            gap={8}
            align="center"
            height="20px"
            minWidth="0"
            ref={labelRef}
            width="100%"
          >
            {hasUnreadConversations && (
              <CircleCounter count={unreadConversationsCount} size={20} />
            )}
            <EllipsisText
              fontWeight={unreadConversationsCount ? 'bold' : 'medium'}
              text={interventionName}
              width={interventionNameMaxWidth}
            />
          </LabelRow>
        }
        bgOpacity={0}
      >
        {children}
      </Collapse>
    </Box>
  );
};

export default InterventionConversationCollapse;
