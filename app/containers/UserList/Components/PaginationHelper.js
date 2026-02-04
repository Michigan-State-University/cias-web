import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import Box from 'components/Box';
import H1 from 'components/H1';
import Text from 'components/Text';
import Row from 'components/Row';

import { colors, themeColors } from 'theme';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import messages from '../messages';

const PaginationHandler = ({
  setPage,
  page,
  pages,
  size,
  justify = 'center',
}) => {
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (!isNullOrUndefined(size) && page > pages) {
      setPage(1);
    }
  }, [size]);

  const changePage = (pageNum) => () => setPage(pageNum);

  const previousPage = page - 1;
  const nextPage = page + 1;
  const showLastPage = pages - 1 > page;
  const showFirstPage = page > 2;
  const notFirstPage = page !== 1;
  const isLastPage = pages === page;

  const renderButton = (selectedPage) => {
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
        aria-label={formatMessage(messages.paginationXPageAriaLabel, {
          page: selectedPage,
        })}
        aria-selected={active}
      >
        <Text color={active ? colors.white : colors.black}>{selectedPage}</Text>
      </Box>
    );
  };

  return (
    <Row
      width="100%"
      display="flex"
      justify={justify}
      mb={20}
      role="navigation"
      aria-label={formatMessage(messages.paginationAriaLabel)}
    >
      {notFirstPage && (
        <H1
          aria-label={formatMessage(messages.paginationPreviousPageAriaLabel)}
          cursor="pointer"
          onClick={changePage(previousPage)}
        >{`<`}</H1>
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
        </>
      )}

      {!isLastPage && (
        <H1
          aria-label={formatMessage(messages.paginationNextPageAriaLabel)}
          cursor="pointer"
          onClick={changePage(nextPage)}
        >{`>`}</H1>
      )}
    </Row>
  );
};

PaginationHandler.propTypes = {
  setPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  size: PropTypes.number,
  justify: PropTypes.string,
};

export default PaginationHandler;
