import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/Spinner';

import { formatMessage } from 'utils/intlOutsideReact';

import AddLabel from './AddLabel';
import messages from './messages';
import { NewItemFloatButton } from './styled';

const NewFloatButton = ({ onClick, loading, label }) => (
  <NewItemFloatButton onClick={onClick}>
    {!loading && <AddLabel label={label} direction="row" mr={15} />}
    {loading && <Spinner />}
  </NewItemFloatButton>
);

NewFloatButton.propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  label: PropTypes.string,
};

NewFloatButton.defaultProps = {
  label: formatMessage(messages.defaultLabel),
};
export default NewFloatButton;
