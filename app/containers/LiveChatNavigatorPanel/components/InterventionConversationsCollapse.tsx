import React, { useState } from 'react';

import { colors } from 'theme';

import Collapse from 'components/Collapse';
import Text from 'components/Text';
import Box from 'components/Box';
import StyledCircle from 'components/Circle/StyledCircle';
import Row from 'components/Row';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';

type Props = {
  interventionName: string;
  children: React.ReactNode;
  isFirst: boolean;
  unreadConversationsCount: number;
};

const InterventionConversationCollapse = ({
  interventionName,
  children,
  isFirst,
  unreadConversationsCount,
}: Props) => {
  const [openCollapsible, setOpenCollapsible] = useState(isFirst);
  const toggleCollapsible = () => setOpenCollapsible(!openCollapsible);
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
          <Row gap={8} align="center" height="20px" minWidth="0">
            {Boolean(unreadConversationsCount) && (
              <Box flexShrink={0}>
                <StyledCircle
                  size="20px"
                  bg={colors.vermilion}
                  color={colors.white}
                  fontWeight="bold"
                  fontSize="12px"
                >
                  {unreadConversationsCount > 9
                    ? `9+`
                    : unreadConversationsCount}
                </StyledCircle>
              </Box>
            )}
            <Text
              fontWeight={unreadConversationsCount ? 'bold' : 'medium'}
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
            >
              {interventionName}
            </Text>
          </Row>
        }
        bgOpacity={0}
      >
        {children}
      </Collapse>
    </Box>
  );
};

export default InterventionConversationCollapse;
