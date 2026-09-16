import React, { memo, useContext, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';

import {
  makeSelectInterventions,
  makeSelectCopyModalLoaders,
  fetchInterventionsWithPaginationRequest,
  makeSelectInterventionCount,
} from 'global/reducers/copyModalReducer';
import { Intervention, InterventionStatus } from 'models/Intervention';

import NoContent from 'components/NoContent';
import Box from 'components/Box';
import Spinner from 'components/Spinner';
import { VirtualGrid } from 'components/VirtualList';

import ViewWrapper from './ViewWrapper';
import InterventionRow from './InterventionRow';

import messages from '../messages';
import {
  VariableChooserContext,
  InterventionViewContext,
  batchSize,
} from '../constants';

type Props = {
  onClick: (interventionId: string) => void;
};

const InterventionView = ({ onClick }: Props) => {
  const infiniteLoaderRef = useRef();
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const { organizationId } = useContext(VariableChooserContext);

  // actions
  const fetchInterventions = (startIndex: number, endIndex: number) =>
    dispatch(
      fetchInterventionsWithPaginationRequest(
        { startIndex, endIndex },
        {
          statuses: [InterventionStatus.PUBLISHED, InterventionStatus.PAUSED],
          organizationId,
        },
      ),
    );

  // selectors
  const interventions = useSelector<unknown, Intervention[]>(
    makeSelectInterventions(),
  );
  const { interventions: interventionsLoading } = useSelector(
    makeSelectCopyModalLoaders(),
  );
  const interventionCount = useSelector(makeSelectInterventionCount());

  useEffect(() => {
    fetchInterventions(0, batchSize);
  }, []);

  const contextValue = useMemo(() => ({ onClick }), [onClick]);

  if (interventionsLoading && !interventions?.length) {
    return <Spinner color={themeColors.secondary} />;
  }

  if (!interventions || !interventions.length)
    return (
      <ViewWrapper>
        <Box padding={30}>
          {/* @ts-ignore */}
          <NoContent text={formatMessage(messages.noInterventions)} />
        </Box>
      </ViewWrapper>
    );

  return (
    <ViewWrapper>
      {interventions && (
        <InterventionViewContext.Provider value={contextValue}>
          {/* @ts-ignore */}
          <VirtualGrid
            ref={infiniteLoaderRef}
            columnCount={1}
            rowCount={interventions?.length || 0}
            rowHeight={30}
            items={interventions}
            gutterHeight={0}
            gutterWidth={0}
            infiniteLoader={{
              loadMoreItems: fetchInterventions,
              itemCount: interventionCount,
              minimumBatchSize: batchSize,
            }}
          >
            {InterventionRow}
          </VirtualGrid>
        </InterventionViewContext.Provider>
      )}
    </ViewWrapper>
  );
};

export default memo(InterventionView);
