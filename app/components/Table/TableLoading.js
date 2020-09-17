import React from 'react';
import PropTypes from 'prop-types';

import Spinner from 'components/Spinner';
import { themeColors } from 'theme';

import { Table } from './Table';
import { TableLoader, TableLoadingContainer } from './styled';
export const TableLoading = ({ loading, children, ...rest }) => (
  <TableLoadingContainer>
    <Table {...rest}>{children}</Table>
    {loading && (
      <TableLoader>
        <Spinner color={themeColors.secondary} size={100} />
      </TableLoader>
    )}
  </TableLoadingContainer>
);

TableLoading.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node,
};

export default TableLoading;
