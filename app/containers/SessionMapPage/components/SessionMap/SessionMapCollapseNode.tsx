import React, { memo } from 'react';
import { NodeProps } from 'react-flow-renderer';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { themeColors } from 'theme';

import { styleTextBold } from 'utils/markup';

import { ReactFlowNodeHandles } from 'components/ReactFlowGraph';
import Box from 'components/Box';
import Column from 'components/Column';
import H1 from 'components/H1';
import Text from 'components/Text';

import { CollapseNodeData } from '../../types';
import { sessionMapColors } from '../../constants';
import messages from '../../messages';

const SessionMapCollapseNode = ({
  id,
  data: { firstCollapsedScreenNo, lastCollapsedScreenNo },
}: NodeProps<CollapseNodeData>): JSX.Element => {
  const { formatMessage } = useIntl();

  const borderX = `1px dashed ${sessionMapColors.sessionNode}`;

  const collapseNodeBody = formatMessage(messages.collapseNodeBody, {
    firstCollapsedScreenNo: styleTextBold(firstCollapsedScreenNo),
    to: styleTextBold(formatMessage(messages.to)),
    lastCollapsedScreenNo: styleTextBold(lastCollapsedScreenNo),
  });

  return (
    <>
      <Box
        width={440}
        height={324}
        px={25}
        mx={15}
        borderLeft={borderX}
        borderRight={borderX}
      >
        <Column height="100%" justify="center">
          <H1 mb={15}>{formatMessage(messages.collapseNodeTitle)}</H1>
          <Text fontSize={18} color={themeColors.comment}>
            <Markup content={collapseNodeBody} noWrap />
          </Text>
        </Column>
      </Box>
      <ReactFlowNodeHandles
        nodeId={id}
        showSourceHandle
        sourceHandleColor={sessionMapColors.edgeBase}
      />
    </>
  );
};

export default memo(SessionMapCollapseNode);
