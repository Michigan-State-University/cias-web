import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import { StripedTR, TH, THead } from 'components/Table';
import { colors } from 'theme';

import { columns, teamColumns, TeamIdContext } from './utils';

const TableHeader = ({ formatMessage }) => {
  const teamId = useContext(TeamIdContext);

  const columnsToUse = teamId ? teamColumns : columns;

  return (
    <THead>
      <StripedTR>
        {columnsToUse(formatMessage).map((column, columnIndex) => (
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
