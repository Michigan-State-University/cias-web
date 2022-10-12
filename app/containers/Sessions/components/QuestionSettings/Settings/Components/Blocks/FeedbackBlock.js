import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Column from 'components/Column';
import Box from 'components/Box';
import Select from 'components/Select';

import { EFeedbackAction } from 'models/Narrator/FeedbackActions';
import messages from '../messages';
import { updateBlockSettings } from '../../actions';

const FeedbackBlock = ({
  formatMessage,
  block,
  updateAction,
  blockIndex,
  id,
  disabled,
}) => {
  const selectOptions = [
    {
      value: EFeedbackAction.SHOW_SPECTRUM,
      label: formatMessage(messages[EFeedbackAction.SHOW_SPECTRUM]),
    },
  ];

  const selectedOption = selectOptions.find(
    (option) => option.value === block.action,
  );

  return (
    <Column>
      <Box mt={15}>{formatMessage(messages.selectAction)}</Box>
      <Box mt={15}>
        <Select
          selectProps={{
            isDisabled: disabled,
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
  disabled: PropTypes.bool,
};

const mapDispatchToProps = {
  updateAction: (index, action, id) =>
    updateBlockSettings(
      index,
      {
        action,
        animation:
          action === EFeedbackAction.NO_ACTION ? 'standStill' : 'pointUp',
      },
      id,
    ),
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(FeedbackBlock);
