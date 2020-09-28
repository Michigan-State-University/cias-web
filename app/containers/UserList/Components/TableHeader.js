import React from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import { StripedTR, TH, THead } from 'components/Table';
import { colors } from 'theme';

import { columns } from './utils';

const TableHeader = ({ formatMessage }) => (
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

TableHeader.propTypes = {
  formatMessage: PropTypes.func.isRequired,
};

export default TableHeader;
