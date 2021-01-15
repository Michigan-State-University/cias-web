import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Column from 'components/Column';
import H2 from 'components/H2';

import isNullOrUndefined from 'utils/isNullOrUndefined';
import messages from './messages';

const TileMapper = ({ items, component }) => (
  <>
    {items && items.map((item, itemIndex) => component(item, itemIndex))}
    {(isNullOrUndefined(items) || items.length === 0) && (
      <Column width="100%" align="center" mt={50}>
        <H2>
          <FormattedMessage {...messages.noResults} />
        </H2>
      </Column>
    )}
  </>
);

TileMapper.propTypes = {
  items: PropTypes.array,
  component: PropTypes.func,
};

export default TileMapper;
