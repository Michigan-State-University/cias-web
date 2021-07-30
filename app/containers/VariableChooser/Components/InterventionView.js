import PropTypes from 'prop-types';
import React, { memo, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import {
  fetchInterventionsRequest,
  makeSelectInterventions,
} from 'global/reducers/copyModalReducer';
import { published } from 'models/Status/StatusTypes';

import NoContent from 'components/NoContent';
import Box from 'components/Box';

import ViewWrapper from './ViewWrapper';
import InterventionRow from './InterventionRow';

import messages from '../messages';
import { VariableChooserContext } from '../constants';

const InterventionView = ({ onClick }) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  // actions
  const fetchInterventions = (organizationId) =>
    dispatch(fetchInterventionsRequest(organizationId));

  // selectors
  const allInterventions = useSelector(makeSelectInterventions());

  const { initialInterventionId, organizationId } = useContext(
    VariableChooserContext,
  );

  useEffect(() => {
    fetchInterventions(organizationId);
  }, []);

  const interventions = useMemo(
    () => allInterventions.filter(({ status }) => status === published),
    [allInterventions],
  );

  const isInitialIntervention = (interventionId) =>
    interventionId === initialInterventionId;

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
      {interventions.map(({ id, name }, index) => (
        <InterventionRow
          key={`${id}-select-intervention-${index}`}
          id={id}
          index={index}
          isInitialIntervention={isInitialIntervention(id)}
          isLast={index === interventions.length - 1}
          name={name}
          onClick={onClick}
        />
      ))}
    </ViewWrapper>
  );
};

InterventionView.propTypes = {
  onClick: PropTypes.func,
};

export default memo(InterventionView);
