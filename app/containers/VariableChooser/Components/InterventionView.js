import PropTypes from 'prop-types';
import React, { memo, useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import {
  makeSelectInterventions,
  makeSelectCopyModalLoaders,
  fetchInterventionsWithPaginationRequest,
  makeSelectInterventionCount,
} from 'global/reducers/copyModalReducer';
import { published } from 'models/Status/StatusTypes';

import NoContent from 'components/NoContent';
import Box from 'components/Box';
import Spinner from 'components/Spinner';

import { themeColors } from 'theme';
import { VirtualGrid } from 'components/VirtualList';
import ViewWrapper from './ViewWrapper';
import InterventionRow from './InterventionRow';

import messages from '../messages';
import {
  VariableChooserContext,
  InterventionViewContext,
  batchSize,
} from '../constants';

const InterventionView = ({ onClick }) => {
  const infiniteLoaderRef = useRef();
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const { organizationId } = useContext(VariableChooserContext);

  // actions
  const fetchInterventions = (startIndex, endIndex) =>
    dispatch(
      fetchInterventionsWithPaginationRequest(
        { startIndex, endIndex },
        { statuses: [published], organizationId },
      ),
    );

  // selectors
  const interventions = useSelector(makeSelectInterventions());
  const { interventions: interventionsLoading } = useSelector(
    makeSelectCopyModalLoaders(),
  );
  const interventionCount = useSelector(makeSelectInterventionCount());

  useEffect(() => {
    fetchInterventions(0, batchSize);
  }, []);

  if (interventionsLoading && !interventions?.length) {
    return <Spinner color={themeColors.secondary} />;
  }

  if (!interventions || !interventions.length)
    return (
      <ViewWrapper>
        <Box padding={30}>
          <NoContent text={formatMessage(messages.noInterventions)} />
        </Box>
      </ViewWrapper>
    );

  return (
    <ViewWrapper>
      {interventions && (
        <InterventionViewContext.Provider value={{ onClick }}>
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

InterventionView.propTypes = {
  onClick: PropTypes.func,
};

export default memo(InterventionView);
