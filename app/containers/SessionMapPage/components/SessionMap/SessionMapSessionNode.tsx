import React, { memo, useMemo, useRef } from 'react';
import { NodeProps } from 'react-flow-renderer';
import { useIntl } from 'react-intl';

import Box from 'components/Box';

import { SessionTileData } from '../../types';
import { sessionMapColors } from '../../constants';
import messages from '../../messages';
import SessionMapNodeHandles from './SessionMapNodeHandles';
import SessionMapNodeBriefInfo from './SessionMapNodeBriefInfo';
import SessionMapSessionNodeDetailedInfo from './SessionMapSessionNodeDetailedInfo';

const SessionMapSessionNode = ({
  data: { sessionIndex, showDetailedInfo },
}: NodeProps<SessionTileData>): JSX.Element => {
  const { formatMessage } = useIntl();

  const nodeRef = useRef<HTMLElement>(null);

  // save node height without border and padding on initial render
  const detailedInfoHeight = useMemo(
    () => nodeRef?.current?.firstElementChild?.clientHeight ?? 0,
    [nodeRef.current],
  );

  return (
    <>
      <Box
        py={18}
        px={24}
        width={210}
        bg={sessionMapColors.sessionNode}
        bgOpacity={0.3}
        border={`1px dashed ${sessionMapColors.sessionNode}`}
        cursor="default"
        ref={nodeRef}
      >
        {showDetailedInfo && (
          <SessionMapSessionNodeDetailedInfo sessionIndex={sessionIndex} />
        )}
        {!showDetailedInfo && (
          <SessionMapNodeBriefInfo
            height={detailedInfoHeight}
            info={formatMessage(messages.sessionNo, { no: sessionIndex })}
          />
        )}
      </Box>
      <SessionMapNodeHandles nodeId={`session-${sessionIndex}`} />
    </>
  );
};

export default memo(SessionMapSessionNode);
