import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Column from 'components/Column';
import Box from 'components/Box';
import Select from 'components/Select';

import { feedbackActions } from 'models/Narrator/FeedbackActions';
import messages from '../messages';
import { updateBlockSettings } from '../../actions';

const FeedbackBlock = ({
  formatMessage,
  block,
  updateAction,
  blockIndex,
  id,
}) => {
  const selectOptions = [
    {
      value: feedbackActions.showSpectrum,
      label: formatMessage(messages[feedbackActions.showSpectrum]),
    },
  ];

  const selectedOption = selectOptions.find(
    option => option.value === block.action,
  );

  return (
    <Column>
      <Box mt={15}>{formatMessage(messages.selectAction)}</Box>
      <Box mt={15}>
        <Select
          selectProps={{
            options: selectOptions,
            value: selectedOption,
            onChange: ({ value }) => updateAction(blockIndex, value, id),
          }}
        />
      </Box>
    </Column>
  );
};

FeedbackBlock.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  block: PropTypes.shape({
    type: PropTypes.string,
    action: PropTypes.string,
  }),
  id: PropTypes.string,
  blockIndex: PropTypes.number,
  updateAction: PropTypes.func,
};

const mapDispatchToProps = {
  updateAction: (index, action, id) =>
    updateBlockSettings(
      index,
      {
        action,
        animation:
          action === feedbackActions.noAction ? 'standStill' : 'pointUp',
      },
      id,
    ),
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(FeedbackBlock);