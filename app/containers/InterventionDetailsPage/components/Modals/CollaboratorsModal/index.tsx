import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { Collaborator } from 'models/Collaborator';
import { User } from 'models/User';

import { emailValidator } from 'utils/validators/emailValidator';

import {
  addCollaboratorsRequest,
  fetchCollaboratorsRequest,
  makeSelectInterventionCollaborators,
  makeSelectInterventionLoader,
  interventionReducer,
} from 'global/reducers/intervention';
import {
  fetchResearchersRequest,
  UserListReducer,
  userListSaga,
  makeSelectUserList,
} from 'global/reducers/userList';

import Search from 'assets/svg/search.svg';
import { themeColors } from 'theme';

import { withAllCollaboratorsSaga } from 'containers/InterventionDetailsPage/saga';

import { AdornmentType } from 'components/FormikInputWithAdornment';
import { InputWithAdornment } from 'components/Input/InputWithAdornment';
import Tabs from 'components/Tabs';
import Icon from 'components/Icon';
import Row from 'components/Row';
import Button from 'components/Button';
import { Table, TBody, TH, THead, TR } from 'components/Table';
import Text from 'components/Text';
import Spinner from 'components/Spinner';

import Box from 'components/Box';
import messages from './messages';
import SingleCollaboratorRow from './SingleCollaboratorRow';
import { COLLABORATORS_MODAL_WIDTH } from './constants';
import ResearcherRow from './ResearcherRow';

type Props = {
  interventionId: string;
};

const CollaboratorsModal = ({ interventionId }: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const collaborators: Collaborator[] = useSelector(
    makeSelectInterventionCollaborators(),
  );

  const {
    researchersSelectorLoading,
    researchersSelector,
  }: {
    researchersSelectorLoading: boolean;
    researchersSelector: (User & { loading: boolean })[];
  } = useSelector(makeSelectUserList());
  useInjectSaga(withAllCollaboratorsSaga);
  // @ts-ignore
  useInjectReducer({ key: 'intervention', reducer: interventionReducer });

  useInjectReducer({
    key: 'userList',
    // @ts-ignore
    reducer: UserListReducer,
  });
  useInjectSaga({ key: 'userList', saga: userListSaga });

  const collaboratorsLoading = useSelector(
    makeSelectInterventionLoader('collaborators'),
  );

  const [email, setEmail] = useState('');
  const [sendEnabled, setSendEnabled] = useState(false);

  useEffect(() => {
    dispatch(fetchCollaboratorsRequest(interventionId));
    dispatch(fetchResearchersRequest());
  }, []);

  const researchersNotCollaborators = useMemo(() => {
    const collaboratorIds = collaborators.map(({ user: { id } }) => id);
    return researchersSelector.filter(
      ({ id }) => !collaboratorIds.includes(id),
    );
  }, [collaborators, researchersSelector]);

  const onInputChange = (e: any) => {
    setEmail(e.target.value);
    setSendEnabled(emailValidator(e.target.value));
  };
  const submit = () => {
    dispatch(addCollaboratorsRequest([email], interventionId));
    setEmail('');
    setSendEnabled(false);
  };

  return (
    <div>
      {/* @ts-ignore */}
      <Tabs>
        {/* @ts-ignore */}
        <div label={formatMessage(messages.inviteUsers)}>
          <Row>
            <InputWithAdornment
              value={email}
              adornmentType={AdornmentType.PREFIX}
              adornment={<Icon src={Search} />}
              onChange={onInputChange}
              placeholder={formatMessage(messages.inviteByEmail)}
              mr={16}
              adornmentWidth={36}
            />
            <Button disabled={!sendEnabled} width={200} onClick={submit}>
              {formatMessage(messages.sendInvite)}
            </Button>
          </Row>
          {researchersSelectorLoading && (
            <Box mt={16}>
              <Spinner color={themeColors.secondary} />
            </Box>
          )}
          {!researchersSelectorLoading && (
            <Table width="100%">
              <THead>
                <TR height={46}>
                  <TH padding={8}>
                    <Text textAlign="left" fontWeight="bold">
                      <FormattedMessage {...messages.name} />
                    </Text>
                  </TH>
                  <TH padding={8}>
                    <Text textAlign="left" fontWeight="bold">
                      <FormattedMessage {...messages.email} />
                    </Text>
                  </TH>
                  <TH padding={8} width={50}>
                    <Text textAlign="left" fontWeight="bold">
                      <FormattedMessage {...messages.invite} />
                    </Text>
                  </TH>
                </TR>
              </THead>
              <TBody>
                {researchersNotCollaborators.map((researcher) => (
                  <ResearcherRow
                    key={researcher.id}
                    researcher={researcher}
                    interventionId={interventionId}
                  />
                ))}
              </TBody>
            </Table>
          )}
        </div>
        {/* @ts-ignore */}
        <div label={formatMessage(messages.currentCollaborators)}>
          <Table width="100%">
            <THead>
              <TR height={46}>
                <TH padding={8}>
                  <Text textAlign="left" fontWeight="bold">
                    <FormattedMessage {...messages.name} />
                  </Text>
                </TH>
                <TH padding={8}>
                  <Text textAlign="left" fontWeight="bold">
                    <FormattedMessage {...messages.view} />
                  </Text>
                </TH>
                <TH padding={8}>
                  <Text textAlign="left" fontWeight="bold">
                    <FormattedMessage {...messages.edit} />
                  </Text>
                </TH>
                <TH padding={8}>
                  <Text textAlign="left" fontWeight="bold">
                    <FormattedMessage {...messages.dataAccess} />
                  </Text>
                </TH>
                <TH width={50}></TH>
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
                  />
                ))}
            </TBody>
          </Table>
        </div>
      </Tabs>
    </div>
  );
};

export default CollaboratorsModal;

export { COLLABORATORS_MODAL_WIDTH };
