import React, { useEffect, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { Collaborator } from 'models/Collaborator';

import {
  addCollaboratorsRequest,
  fetchCollaboratorsRequest,
  makeSelectInterventionCollaborators,
  makeSelectInterventionLoader,
  interventionReducer,
} from 'global/reducers/intervention';

import { withAllCollaboratorsSaga } from 'containers/InterventionDetailsPage/saga';

import Tabs from 'components/Tabs';
import { Table, TBody, TH, THead, TR } from 'components/Table';
import Text from 'components/Text';
import Spinner from 'components/Spinner';
import Box from 'components/Box';

import SelectResearchers from 'containers/SelectResearchers';

import messages from './messages';
import SingleCollaboratorRow from './SingleCollaboratorRow';
import { COLLABORATORS_MODAL_WIDTH, TABLE_MAX_HEIGHT } from './constants';

type Props = {
  interventionId: string;
  isCurrentUserInterventionOwner: boolean;
};

const CollaboratorsModal = ({
  interventionId,
  isCurrentUserInterventionOwner,
}: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const collaborators: Collaborator[] = useSelector(
    makeSelectInterventionCollaborators(),
  );

  useInjectSaga(withAllCollaboratorsSaga);
  // @ts-ignore
  useInjectReducer({ key: 'intervention', reducer: interventionReducer });

  const collaboratorsLoading = useSelector(
    makeSelectInterventionLoader('collaborators'),
  );

  useEffect(() => {
    dispatch(fetchCollaboratorsRequest(interventionId));
  }, []);

  const currentCollaboratorsIds = useMemo(
    () => collaborators.map(({ user: { id } }) => id),
    [collaborators],
  );

  const handleResearchersSelected = (emails: string[], ids?: string[]) =>
    dispatch(addCollaboratorsRequest(emails, interventionId, ids));

  return (
    <div>
      {/* @ts-ignore */}
      <Tabs>
        {/* @ts-ignore */}
        <div label={formatMessage(messages.inviteUsers)}>
          <SelectResearchers
            onResearchersSelected={handleResearchersSelected}
            excludedUserIds={currentCollaboratorsIds}
            actionName={formatMessage(messages.invite)}
          />
        </div>
        {/* @ts-ignore */}
        <div label={formatMessage(messages.currentCollaborators)}>
          <Box overflow="auto" maxHeight={TABLE_MAX_HEIGHT}>
            <Table width="100%">
              <THead>
                <TR height={46}>
                  <TH padding={8}>
                    <Text textAlign="left" fontWeight="bold">
                      <FormattedMessage {...messages.name} />
                    </Text>
                  </TH>
                  <TH padding={8} width={25}>
                    <Text textAlign="left" fontWeight="bold">
                      <FormattedMessage {...messages.view} />
                    </Text>
                  </TH>
                  <TH padding={8} width={25}>
                    <Text textAlign="left" fontWeight="bold">
                      <FormattedMessage {...messages.edit} />
                    </Text>
                  </TH>
                  <TH padding={8} width={25}>
                    <Text textAlign="left" fontWeight="bold">
                      <FormattedMessage {...messages.dataAccess} />
                    </Text>
                  </TH>
                  <TH width={15}></TH>
                </TR>
              </THead>
              <TBody>
                {collaboratorsLoading && <Spinner />}
                {!collaboratorsLoading &&
                  collaborators.map((collaborator, index) => (
                    <SingleCollaboratorRow
                      key={collaborator.id}
                      index={index}
                      collaborator={collaborator}
                      interventionId={interventionId}
                      isCurrentUserInterventionOwner={
                        isCurrentUserInterventionOwner
                      }
                    />
                  ))}
              </TBody>
            </Table>
          </Box>
        </div>
      </Tabs>
    </div>
  );
};

export default CollaboratorsModal;

export { COLLABORATORS_MODAL_WIDTH };
