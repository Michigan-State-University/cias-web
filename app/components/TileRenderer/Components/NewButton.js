import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Spinner from 'components/Spinner';

import { NewElementContainer } from './styled';
import AddLabel from './AddLabel';

const NewButton = forwardRef(({ onClick, loading, label }, ref) => (
  <NewElementContainer onClick={onClick} ref={ref}>
    {!loading && <AddLabel label={label} direction="column" mb={15} />}
    {loading && <Spinner />}
  </NewElementContainer>
));

NewButton.propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  label: PropTypes.string,
};

export default NewButton;
