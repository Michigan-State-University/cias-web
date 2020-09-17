import React from 'react';
import PropTypes from 'prop-types';

import { PER_PAGE } from 'global/reducers/userList/constants';

import Box from 'components/Box';
import H1 from 'components/H1';
import Text from 'components/Text';
import { colors, themeColors } from 'theme';

const PaginationHandler = ({ setPage, page, userSize }) => {
  const changePage = pageNum => () => setPage(pageNum);

  return (
    <Box width="100%" display="flex" justify="end" mb={20}>
      {page !== 1 && (
        <H1 cursor="pointer" onClick={changePage(page - 1)}>{`<`}</H1>
      )}
      <Box
        mx={10}
        px={10}
        bg={themeColors.secondary}
        borderRadius={5}
        display="flex"
        align="center"
        minHeight={25}
      >
        <Text color={colors.white}>{page}</Text>
      </Box>
      {userSize === PER_PAGE && (
        <H1 cursor="pointer" onClick={changePage(page + 1)}>{`>`}</H1>
      )}
    </Box>
  );
};

PaginationHandler.propTypes = {
  setPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  userSize: PropTypes.number.isRequired,
};

export default PaginationHandler;
