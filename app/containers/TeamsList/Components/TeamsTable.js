import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import ConfirmationBox from 'components/ConfirmationBox';
import H1 from 'components/H1';
import Text from 'components/Text';
import { TableLoading } from 'components/Table';
import { boxShadows } from 'theme';

import Team from 'models/Teams/Team';
import messages from '../messages';
import PaginationHandler from './PaginationHelper';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

const TeamsTable = ({
  formatMessage,
  teams,
  loading,
  setPage,
  page,
  history,
  pages,
  deleteTeam,
}) => {
  const [pickedTeam, setPickedTeam] = useState({});

  const openModal = (user) => setPickedTeam(user);
  const closeModal = () => setPickedTeam({});

  const handleDeleteTeam = () => {
    deleteTeam(pickedTeam.id);
    closeModal();
  };

  if (teams.length === 0)
    return (
      <H1>
        <FormattedMessage {...messages.noTeams} />
      </H1>
    );

  const modalContent = (
    <>
      <Text textAlign="center" fontWeight="bold">
        {pickedTeam.name}
      </Text>
      <Text textAlign="center">{pickedTeam.teamAdmin?.email}</Text>
    </>
  );
  return (
    <>
      <ConfirmationBox
        visible={Boolean(pickedTeam.id)}
        onClose={closeModal}
        description={formatMessage(messages.deleteTeamConfirm)}
        content={modalContent}
        confirmAction={handleDeleteTeam}
      />
      <TableLoading
        loading={loading}
        width="100%"
        mb={20}
        shadow={boxShadows.selago}
      >
        <TableHeader formatMessage={formatMessage} />
        <TableBody
          teams={teams}
          history={history}
          openModal={openModal}
          formatMessage={formatMessage}
        />
      </TableLoading>
      <PaginationHandler setPage={setPage} page={page} pages={pages} />
    </>
  );
};

TeamsTable.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  teams: PropTypes.arrayOf(PropTypes.shape(Team)),
  pages: PropTypes.number,
  loading: PropTypes.bool,
  page: PropTypes.number,
  setPage: PropTypes.func,
  history: PropTypes.object,
  deleteTeam: PropTypes.func,
};

export default compose(withRouter, memo)(TeamsTable);
