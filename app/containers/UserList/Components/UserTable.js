import React, { Fragment, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { ConfirmationModal } from 'components/Modal';
import H1 from 'components/H1';
import Text from 'components/Text';
import { TableLoading } from 'components/Table';
import { boxShadows, fontSizes } from 'theme';
import { ternary } from 'utils/ternary';

import { RemoveFromTeamModalContext } from 'containers/UserList/Components/utils';
import messages from '../messages';
import PaginationHandler from './PaginationHelper';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

const UserTable = ({
  formatMessage,
  users,
  loading,
  changeActivateStatus,
  removeUserFromTeam,
  setPage,
  page,
  history,
  pages,
}) => {
  const [pickedUser, setPickedUser] = useState({});
  const [userToRemove, setUserToRemove] = useState({});

  const openModal = (user) => setPickedUser(user);
  const closeModal = () => setPickedUser({});

  const openRemoveUserModal = (user) => setUserToRemove(user);
  const closeRemoveUserModal = () => setUserToRemove({});

  const handleDeactivate = () => {
    const { active, id } = pickedUser;
    changeActivateStatus(id, !active);
    closeModal();
  };

  const handleRemoveFromTeam = () => {
    const { id, teamId } = userToRemove;
    removeUserFromTeam(id, teamId);
    closeRemoveUserModal();
  };

  if (users.length === 0)
    return (
      <H1>
        <FormattedMessage {...messages.noUsers} />
      </H1>
    );

  const modalDescription = ternary(
    pickedUser.active,
    formatMessage(messages.deactivateAccountConfirm),
    formatMessage(messages.activateAccountConfirm),
  );
  const modalContent = (
    <>
      <Text
        textAlign="center"
        fontWeight="bold"
        data-private
        fontSize={fontSizes.medium}
      >
        {pickedUser.fullName}
      </Text>
      <Text textAlign="center" data-private fontSize={fontSizes.medium}>
        {pickedUser.email}
      </Text>
    </>
  );

  const userToRemoveModalContent = (
    <>
      <Text
        textAlign="center"
        fontWeight="bold"
        data-private
        fontSize={fontSizes.medium}
      >
        {userToRemove.fullName}
      </Text>
      <Text textAlign="center" data-private fontSize={fontSizes.medium}>
        {userToRemove.email}
      </Text>
    </>
  );

  return (
    <>
      <ConfirmationModal
        visible={Boolean(pickedUser.id)}
        onClose={closeModal}
        description={modalDescription}
        content={modalContent}
        confirmAction={handleDeactivate}
      />
      <ConfirmationModal
        visible={Boolean(userToRemove.id)}
        onClose={closeRemoveUserModal}
        description={formatMessage(messages.deleteFromTeamConfirm)}
        content={userToRemoveModalContent}
        confirmAction={handleRemoveFromTeam}
      />
      <div data-private>
        <TableLoading
          loading={loading}
          width="100%"
          mb={20}
          shadow={boxShadows.selago}
        >
          <TableHeader formatMessage={formatMessage} />
          <RemoveFromTeamModalContext.Provider value={openRemoveUserModal}>
            <TableBody
              users={users}
              history={history}
              openModal={openModal}
              formatMessage={formatMessage}
            />
          </RemoveFromTeamModalContext.Provider>
        </TableLoading>
      </div>
      <PaginationHandler setPage={setPage} page={page} pages={pages} />
    </>
  );
};

UserTable.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  users: PropTypes.array,
  pages: PropTypes.number,
  loading: PropTypes.bool,
  page: PropTypes.number,
  setPage: PropTypes.func,
  changeActivateStatus: PropTypes.func.isRequired,
  removeUserFromTeam: PropTypes.func.isRequired,
  history: PropTypes.object,
};

export default compose(withRouter, memo)(UserTable);
