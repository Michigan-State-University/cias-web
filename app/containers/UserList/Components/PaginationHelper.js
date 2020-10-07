import React from 'react';
import PropTypes from 'prop-types';

import Box from 'components/Box';
import H1 from 'components/H1';
import Text from 'components/Text';
import Row from 'components/Row';

import { colors, themeColors } from 'theme';

const PaginationHandler = ({ setPage, page, pages }) => {
  const changePage = pageNum => () => setPage(pageNum);

  const previousPage = page - 1;
  const nextPage = page + 1;
  const showLastPage = pages - 1 > page;
  const showFirstPage = page > 2;
  const notFirstPage = page !== 1;

  const renderButton = selectedPage => {
    const active = selectedPage === page;
    return (
      <Box
        cursor="pointer"
        onClick={changePage(selectedPage)}
        mx={10}
        px={10}
        bg={active ? themeColors.secondary : colors.white}
        borderRadius={5}
        display="flex"
        align="center"
        minHeight={25}
        minWidth={25}
      >
        <Text color={active ? colors.white : colors.black}>{selectedPage}</Text>
      </Box>
    );
  };

  return (
    <Row width="100%" display="flex" justify="center" mb={20}>
      {notFirstPage && (
        <H1 cursor="pointer" onClick={changePage(previousPage)}>{`<`}</H1>
      )}

      {showFirstPage && (
        <>
          {renderButton(1)}
          <H1>...</H1>
        </>
      )}

      {previousPage > 0 && renderButton(previousPage)}

      {renderButton(page)}

      {nextPage <= pages && renderButton(nextPage)}

      {showLastPage && (
        <>
          <H1>...</H1>
          {renderButton(pages)}
          <H1 cursor="pointer" onClick={changePage(nextPage)}>{`>`}</H1>
        </>
      )}
    </Row>
  );
};

PaginationHandler.propTypes = {
  setPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
};

export default PaginationHandler;
