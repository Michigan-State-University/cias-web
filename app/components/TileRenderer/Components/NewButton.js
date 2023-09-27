import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { colors, themeColors } from 'theme';

import Spinner from 'components/Spinner';
import { TileContainer } from 'components/TileContainer';

import AddLabel from './AddLabel';

const NewButton = forwardRef(({ onClick, loading, label }, ref) => (
  <TileContainer
    data-cy="create-intervention-button"
    onClick={onClick}
    ref={ref}
    bg={themeColors.secondary}
    color={colors.white}
    justify="center"
    align="center"
  >
    {!loading && <AddLabel label={label} direction="column" mb={15} />}
    {loading && <Spinner />}
  </TileContainer>
));

NewButton.propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  label: PropTypes.string,
};

export default NewButton;
