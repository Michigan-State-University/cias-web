import React from 'react';
import PropTypes from 'prop-types';

import { TBody } from 'components/Table';

import TableRow from './TableRow';

const TableBody = ({ users, history, openModal, formatMessage }) => (
  <TBody>
    {users.map(user => (
      <TableRow
        key={`row-th-${user.id}`}
        user={user}
        history={history}
        openModal={openModal}
        formatMessage={formatMessage}
      />
    ))}
  </TBody>
);

TableBody.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object,
  openModal: PropTypes.func,
  formatMessage: PropTypes.func.isRequired,
};

export default TableBody;
