/**
 *
 * SelectResearchers
 *
 */

import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import remove from 'lodash/remove';
import trim from 'lodash/trim';
import { injectSaga, injectReducer } from 'redux-injectors';

import { themeColors } from 'theme';

import useFilter from 'utils/useFilter';
import { ternary } from 'utils/ternary';

import {
  makeSelectUserList,
  UserListReducer,
  userListSaga,
  fetchResearchersRequest,
} from 'global/reducers/userList';

import Row from 'components/Row';
import Loader from 'components/Loader';
import Column from 'components/Column';
import Box from 'components/Box';
import Text, { HiddenText } from 'components/Text';
import { StripedTR, Table, TBody, TD, TH, THead } from 'components/Table';
import Checkbox from 'components/Checkbox';
import { StyledButton } from 'components/Button/StyledButton';
import ErrorAlert from 'components/ErrorAlert';
import SearchInput from 'components/Input/SearchInput';

import messages from './messages';

const SelectResearchers = ({
  userList: {
    researchersSelector,
    researchersSelectorLoading,
    researchersSelectorError,
  },
  fetchUsersRequest,
  onClose,
  onResearchersSelected,
  filterParams,
}) => {
  const { formatMessage } = useIntl();
  const [selected, setSelected] = useState([]);

  const [finalUsers, filterValue, setFilterValue] = useFilter(
    researchersSelector,
    'fullName',
    { initialDelay: 0 },
  );
  useLayoutEffect(() => {
    fetchUsersRequest(filterParams);
  }, []);

  const handleSend = () => {
    onResearchersSelected(selected);
    onClose();
  };

  const getDisplayName = (fullName) => {
    const trimmedFullName = trim(fullName);
    return ternary(
      trimmedFullName,
      trimmedFullName,
      <Text color={themeColors.warning}>
        {formatMessage(messages.waitingForActivation)}
      </Text>,
    );
  };

  if (researchersSelectorLoading)
    return (
      <Box>
        <Loader type="inline" />
      </Box>
    );
  if (researchersSelectorError)
    return (
      <Box>
        <ErrorAlert errorText={researchersSelectorError} />
      </Box>
    );
  return (
    <Box>
      <Row pt={10} width="100%">
        <SearchInput
          ml={5}
          width="100%"
          placeholder={formatMessage(messages.find)}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          debounceTime={500}
        />
        <StyledButton
          disabled={selected.length === 0}
          width={200}
          ml={10}
          onClick={handleSend}
        >
          {formatMessage(messages.send)}
        </StyledButton>
      </Row>
      <Table>
        <THead>
          <StripedTR>
            <TH scope="col">
              <Column width={290} pl={10}>
                <Text textAlign="left" fontWeight="bold">
                  {formatMessage(messages.name)}
                </Text>
              </Column>
            </TH>
            <TH scope="col">
              <Column width={300}>
                <Text textAlign="left" fontWeight="bold">
                  {formatMessage(messages.email)}
                </Text>
              </Column>
            </TH>
            <TH scope="col">
              <Column width="100%">
                <Text textAlign="left" fontWeight="bold">
                  {formatMessage(messages.checkbox)}
                </Text>
              </Column>
            </TH>
          </StripedTR>
        </THead>
        <TBody>
          {finalUsers &&
            finalUsers.map((user) => {
              const { fullName, email, id } = user;
              const isChecked = selected.includes(id);
              const handleClick = () => {
                if (!isChecked) setSelected([...selected, id]);
                else setSelected(remove(selected, (elem) => elem !== id));
              };

              const rowId = `row-th-${id}`;
              const checkboxLabelId = `researcher-email-${email}`;

              return (
                <StripedTR key={rowId} data-private>
                  <TD pl={10}>{getDisplayName(fullName)}</TD>
                  <TD>{email}</TD>
                  <TD pr={10}>
                    <Checkbox
                      id={checkboxLabelId}
                      aria-labelledby={rowId}
                      checked={isChecked}
                      onChange={handleClick}
                    >
                      <HiddenText>{email}</HiddenText>
                    </Checkbox>
                  </TD>
                </StripedTR>
              );
            })}
        </TBody>
      </Table>
    </Box>
  );
};

SelectResearchers.propTypes = {
  userList: PropTypes.object,
  fetchUsersRequest: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  onResearchersSelected: PropTypes.func,
  filterParams: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userList: makeSelectUserList(),
});

const mapDispatchToProps = {
  fetchUsersRequest: fetchResearchersRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'userList',
  reducer: UserListReducer,
});
const withSaga = injectSaga({ key: 'userList', saga: userListSaga });

export default compose(withConnect, withReducer, withSaga)(SelectResearchers);
