import React, { memo, useMemo } from 'react';
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
import { SESSION_MAP_COLORS, NODE_THIN_BORDER_WIDTH } from '../../constants';
import messages from '../../messages';
import { getNodeDimensions } from './utils';

const SessionMapCollapseNode = ({
  id,
  data: { firstCollapsedScreenNo, lastCollapsedScreenNo },
  type: nodeType,
}: NodeProps<CollapseNodeData>): JSX.Element => {
  const { formatMessage } = useIntl();

  const nodeDimensions = useMemo(() => getNodeDimensions(nodeType), [nodeType]);

  const verticalBorder = `${NODE_THIN_BORDER_WIDTH}px dashed ${SESSION_MAP_COLORS.sessionNodeBackground}`;

  const collapseNodeBody = formatMessage(messages.collapseNodeBody, {
    firstCollapsedScreenNo: styleTextBold(firstCollapsedScreenNo),
    to: styleTextBold(formatMessage(messages.to)),
    lastCollapsedScreenNo: styleTextBold(lastCollapsedScreenNo),
  });

  return (
    <>
      <Box
        {...nodeDimensions}
        px={25}
        mx={15}
        borderLeft={verticalBorder}
        borderRight={verticalBorder}
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
        displaySourceHandle
        sourceHandleColor={SESSION_MAP_COLORS.edgeBase}
      />
    </>
  );
};

export default memo(SessionMapCollapseNode);
