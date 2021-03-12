import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import { StripedTR, TH, THead } from 'components/Table';
import { colors } from 'theme';

import { adminColumns, teamAdminColumns, TeamListContext } from './utils';

const TableHeader = ({ formatMessage }) => {
  const { isAdmin } = useContext(TeamListContext);

  const columns = useMemo(() => (isAdmin ? adminColumns : teamAdminColumns), [
    isAdmin,
  ]);

  return (
    <THead>
      <StripedTR>
        {columns(formatMessage).map((column, columnIndex) => (
          <TH
            bg={colors.white}
            color={colors.bluewood}
            opacity={0.6}
            scope="col"
            key={`col-th-${columnIndex}`}
            width="auto"
          >
            <Column pl={20} align="start">
              {column}
            </Column>
          </TH>
        ))}
      </StripedTR>
    </THead>
  );
};

TableHeader.propTypes = {
  formatMessage: PropTypes.func.isRequired,
};

export default TableHeader;
