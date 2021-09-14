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

import { InterventionDto } from 'models/Intervention/InterventionDto';
import ViewWrapper from './ViewWrapper';
import InterventionRow from './InterventionRow';

import messages from '../messages';
import { VariableChooserContext } from '../constants';

type Props = {
  onClick: (interventionId: string) => void;
};

const InterventionView = ({ onClick }: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const { initialInterventionId, organizationId } = useContext(
    VariableChooserContext,
  );

  // actions
  const fetchInterventions = (orgId: string) =>
    dispatch(fetchInterventionsRequest(orgId));

  // selectors
  const allInterventions = useSelector(
    makeSelectInterventions(),
  ) as InterventionDto[];

  useEffect(() => {
    fetchInterventions(organizationId);
  }, []);

  const interventions = useMemo(
    () => allInterventions?.filter(({ status }) => status === published),
    [allInterventions],
  );

  const isInitialIntervention = (interventionId: string) =>
    interventionId === initialInterventionId;

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
      {interventions.map(({ id, name }, index) => (
        <InterventionRow
          key={`${id}-select-intervention-${index}`}
          id={id}
          isInitialIntervention={isInitialIntervention(id)}
          isLast={index === interventions.length - 1}
          name={name}
          onClick={onClick}
        />
      ))}
    </ViewWrapper>
  );
};

export default memo(InterventionView);
