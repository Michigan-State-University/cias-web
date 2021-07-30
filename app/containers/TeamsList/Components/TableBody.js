import React from 'react';
import PropTypes from 'prop-types';

import { TBody } from 'components/Table';

import Team from 'models/Teams/Team';

import TableRow from './TableRow';

const TableBody = ({ teams, history, openModal, formatMessage }) => (
  <TBody>
    {teams.map((team) => (
      <TableRow
        key={`row-th-${team.id}`}
        team={team}
        history={history}
        openModal={openModal}
        formatMessage={formatMessage}
      />
    ))}
  </TBody>
);

TableBody.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape(Team)),
  history: PropTypes.object,
  openModal: PropTypes.func,
  formatMessage: PropTypes.func.isRequired,
};

export default TableBody;
