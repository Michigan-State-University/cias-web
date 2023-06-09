/**
 *
 * SelectResearchers
 *
 */

import React, {
  useState,
  useLayoutEffect,
  FC,
  useMemo,
  ChangeEvent,
} from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { colors, themeColors } from 'theme';

import { ApiError } from 'models/Api';
import { User } from 'models/User';

import { emailValidator } from 'utils/validators';

import {
  makeSelectUserList,
  UserListReducer,
  userListSaga,
  fetchResearchersRequest,
} from 'global/reducers/userList';

import Row from 'components/Row';
import Box from 'components/Box';
import Text from 'components/Text';
import { Table, TBody, TH, THead, TR } from 'components/Table';
import ErrorAlert from 'components/ErrorAlert';
import Button from 'components/Button';
import { Input } from 'components/Input';
import Spinner from 'components/Spinner';
import Divider from 'components/Divider';

import messages from './messages';
import { TABLE_MAX_HEIGHT } from './constants';
import ResearcherRow from './ResearcherRow';

export type Props = {
  excludedUserIds?: string[];
  onResearchersSelected: (emails: string[], ids?: string[]) => void;
  actionName: string;
};

const SelectResearchers: FC<Props> = ({
  onResearchersSelected,
  excludedUserIds = [],
  actionName,
}) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  useInjectReducer({
    key: 'userList',
    // @ts-ignore
    reducer: UserListReducer,
  });
  useInjectSaga({ key: 'userList', saga: userListSaga });

  const {
    researchersSelectorLoading,
    researchersSelector,
    researchersSelectorError,
  }: {
    researchersSelectorLoading: boolean;
    researchersSelector: (User & { loading: boolean })[];
    researchersSelectorError: ApiError;
  } = useSelector(makeSelectUserList());

  const researchersToShow = useMemo(
    () => researchersSelector.filter(({ id }) => !excludedUserIds.includes(id)),
    [researchersSelector, excludedUserIds],
  );

  useLayoutEffect(() => {
    if (!researchersSelectorLoading) dispatch(fetchResearchersRequest());
  }, []);

  const [email, setEmail] = useState('');
  const [sendEnabled, setSendEnabled] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSendEnabled(emailValidator(e.target.value));
  };

  const submit = () => {
    onResearchersSelected([email]);
    setEmail('');
    setSendEnabled(false);
  };

  if (researchersSelectorError)
    return (
      <Box>
        <ErrorAlert errorText={researchersSelectorError} />
      </Box>
    );
  return (
    <Box>
      <Row gap={16}>
        <Input
          value={email}
          onChange={onInputChange}
          placeholder={`${actionName} ${formatMessage(messages.byEmail)}`}
          width="100%"
        />
        <Button disabled={!sendEnabled} width={200} onClick={submit}>
          {actionName}
        </Button>
      </Row>
      <Row mt={16} mb={8}>
        <Text fontSize={15}>{formatMessage(messages.yourTeamMembers)}</Text>
      </Row>
      <Divider color={colors.lightDivider} />
      {researchersSelectorLoading && (
        <Box mt={16}>
          <Spinner color={themeColors.secondary} />
        </Box>
      )}
      {researchersSelectorError && (
        <Box mt={16}>
          <ErrorAlert errorText={researchersSelectorError} />
        </Box>
      )}
      {!researchersSelectorLoading && !researchersSelectorError && (
        <Box overflow="auto" maxHeight={TABLE_MAX_HEIGHT}>
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
                <TH padding={8} width={40}>
                  <Text textAlign="left" fontWeight="bold">
                    {actionName}
                  </Text>
                </TH>
              </TR>
            </THead>
            <TBody>
              {researchersToShow.map((researcher) => (
                <ResearcherRow
                  key={researcher.id}
                  researcher={researcher}
                  onSelected={() =>
                    onResearchersSelected([researcher.email], [researcher.id])
                  }
                  actionName={actionName}
                />
              ))}
            </TBody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default SelectResearchers;
