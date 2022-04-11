import React from 'react';
import { useIntl } from 'react-intl';

import { jsonApiToArray } from 'utils/jsonApiMapper';

import AppContainer from 'components/Container';
import ApiVirtualGrid from 'components/VirtualList/ApiVirtualGrid';
import H1 from 'components/H1';
import Box from 'components/Box';

import messages from './messages';
import ParticipantInterventionTileRenderer from './participantInterventionTileRenderer';

const ParticipantInterventionsPage = () => {
  const { formatMessage } = useIntl();
  return (
    // @ts-ignore
    <AppContainer
      height="100% !important"
      display="flex"
      direction="column"
      overflow="clip"
    >
      <H1 mt={64} mb={30}>
        {formatMessage(messages.myInterventions)}
      </H1>
      <Box filled>
        <ApiVirtualGrid
          dataParser={(data) => jsonApiToArray(data, 'userIntervention')}
          itemsCountKey="user_interventions_size"
          urlBase="v1/user_interventions"
          renderComponent={ParticipantInterventionTileRenderer}
          noDataMessage={formatMessage(messages.noDataMessage)}
        />
      </Box>
    </AppContainer>
  );
};

export default ParticipantInterventionsPage;
