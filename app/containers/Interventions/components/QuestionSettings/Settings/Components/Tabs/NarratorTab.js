import React, { Fragment } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Box from 'components/Box';
import H3 from 'components/H3';
import Row from 'components/Row';
import Switch from 'components/Switch';
import Text from 'components/Text';
import lastKey from 'utils/getLastKey';
import { colors, borders } from 'theme';
import {
  readQuestionBlockType,
  feedbackBlockType,
} from 'models/Narrator/BlockTypes';
import { makeSelectCurrentNarratorBlockIndex } from 'global/reducers/localState';
import { makeSelectSelectedQuestionType } from 'global/reducers/questions';
import { makeSelectQuestionGroupsIds } from 'global/reducers/questionGroups';
import { ternary } from 'utils/ternary';

import BlockTypeChooser from '../BlockTypeChooser';
import WrappedAccordion from '../WrappedAcoordion';
import messages from '../messages';
import { addBlock, updateNarratorSettings } from '../../actions';

const NarratorTab = ({
  formatMessage,
  narrator,
  onNarratorToggle,
  onCreate,
  id,
  currentBlockIndex,
  currentQuestionType,
  disabled,
  groupIds,
}) => {
  if (!narrator) {
    return <></>;
  }

  const onCreateBlock = type => {
    onCreate(type, id, groupIds);
  };

  const readQuestionBlockTypePresent = Boolean(
    narrator.blocks.find(({ type }) => type === readQuestionBlockType),
  );

  const showSpectrumBlockTypePresent = Boolean(
    narrator.blocks.find(({ type }) => type === feedbackBlockType),
  );

  const last = lastKey(narrator.settings);
  const getBorderBottom = index => {
    if (index === last) return null;
    return `${borders.borderWidth} ${borders.borderStyle} ${colors.linkWater}`;
  };

  const isCharacterMovable = currentBlockIndex !== -1;
  return (
    <Fragment>
      <Box mb={20}>
        <Text color={colors.flamingo} mb={30}>
          <FormattedMessage {...messages.warningMessage} />
        </Text>
        {narrator &&
          map(narrator.settings, (val, index) => (
            <Row
              key={`${id}-settings-narrator-${index}`}
              justify="between"
              align="center"
              pb={15}
              mb={15}
              borderBottom={getBorderBottom(index)}
            >
              <H3>{formatMessage(messages[`${index}`])}</H3>
              <Switch
                disabled={disabled}
                checked={val}
                onToggle={value => onNarratorToggle(`${index}`, value)}
              />
            </Row>
          ))}
      </Box>
      <Text
        fontWeight="bold"
        color={
          colors[isCharacterMovable && !disabled ? 'jungleGreen' : 'flamingo']
        }
        mb={15}
      >
        <FormattedMessage
          {...messages[
            ternary(
              disabled,
              'characterMoveDisabled',
              isCharacterMovable ? 'characterMovable' : 'characterBlocked',
            )
          ]}
        />
      </Text>
      <WrappedAccordion
        disabled={disabled}
        id={id}
        formatMessage={formatMessage}
        narrator={narrator}
      />
      <BlockTypeChooser
        disabled={disabled}
        questionType={currentQuestionType}
        disableReadQuestionBlockType={readQuestionBlockTypePresent}
        disableFeedbackBlock={showSpectrumBlockTypePresent}
        onClick={onCreateBlock}
      />
    </Fragment>
  );
};

NarratorTab.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  id: PropTypes.string,
  narrator: PropTypes.object,
  onNarratorToggle: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
  currentBlockIndex: PropTypes.number,
  currentQuestionType: PropTypes.string,
  disabled: PropTypes.bool,
  groupIds: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  currentBlockIndex: makeSelectCurrentNarratorBlockIndex(),
  currentQuestionType: makeSelectSelectedQuestionType(),
  groupIds: makeSelectQuestionGroupsIds(),
});

const mapDispatchToProps = {
  onCreate: addBlock,
  onNarratorToggle: updateNarratorSettings,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(NarratorTab);
