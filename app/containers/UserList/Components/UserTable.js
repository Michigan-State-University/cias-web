import React, { Fragment, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import ConfirmationBox from 'components/ConfirmationBox';
import H1 from 'components/H1';
import Text from 'components/Text';
import { TableLoading } from 'components/Table';
import { boxShadows } from 'theme';
import { ternary } from 'utils/ternary';

import messages from '../messages';
import PaginationHandler from './PaginationHelper';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

const UserTable = ({
  formatMessage,
  users,
  loading,
  changeActivateStatus,
  setPage,
  page,
  history,
  pages,
}) => {
  const [pickedUser, setPickedUser] = useState({});

  const openModal = user => setPickedUser(user);
  const closeModal = () => setPickedUser({});

  const handleDeactivate = () => {
    const { active, id } = pickedUser;
    changeActivateStatus(id, !active);
    closeModal();
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
      <Text textAlign="center" fontWeight="bold">
        {pickedUser.fullName}
      </Text>
      <Text textAlign="center">{pickedUser.email}</Text>
    </>
  );
  return (
    <>
      <ConfirmationBox
        visible={Boolean(pickedUser.id)}
        onClose={closeModal}
        description={modalDescription}
        content={modalContent}
        confirmAction={handleDeactivate}
      />
      <TableLoading
        loading={loading}
        width="100%"
        mb={20}
        shadow={boxShadows.selago}
      >
        <TableHeader formatMessage={formatMessage} />
        <TableBody
          users={users}
          history={history}
          openModal={openModal}
          formatMessage={formatMessage}
        />
      </TableLoading>
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
  history: PropTypes.object,
};

export default compose(
  withRouter,
  memo,
)(UserTable);
