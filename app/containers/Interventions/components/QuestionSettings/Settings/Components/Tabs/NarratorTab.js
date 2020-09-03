import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Box from 'components/Box';
import H3 from 'components/H3';
import Row from 'components/Row';
import Switch from 'components/Switch';
import Text from 'components/Text';
import lastKey from 'utils/getLastKey';
import { colors, borders } from 'theme';
import {
  localStateReducer,
  makeSelectCurrentNarratorBlockIndex,
} from 'global/reducers/localState';
import { readQuestionBlockType } from 'models/Narrator/BlockTypes';
import { useInjectReducer } from 'utils/injectReducer';

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
}) => {
  useInjectReducer({
    key: 'localState',
    reducer: localStateReducer,
  });

  if (!narrator) {
    return <></>;
  }

  const onCreateBlock = type => {
    onCreate(type, id);
  };

  const readQuestionBlockTypePresent = Boolean(
    narrator.blocks.find(({ type }) => type === readQuestionBlockType),
  );

  const last = lastKey(narrator.settings);
  const getBorderBottom = index => {
    if (index === last) return null;
    return `${borders.borderWidth} ${borders.borderStyle} ${colors.linkWater}`;
  };

  const isPeedyMovable = currentBlockIndex !== -1;
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
                checked={val}
                onToggle={value => onNarratorToggle(`${index}`, value)}
              />
            </Row>
          ))}
      </Box>
      <Text color={colors[isPeedyMovable ? 'jungleGreen' : 'flamingo']} mb={15}>
        <FormattedMessage
          {...messages[isPeedyMovable ? 'peedyeMovable' : 'peedyBlocked']}
        />
      </Text>
      <WrappedAccordion
        id={id}
        formatMessage={formatMessage}
        narrator={narrator}
      />
      <BlockTypeChooser
        disableReadQuestionBlockType={readQuestionBlockTypePresent}
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
};

const mapStateToProps = createStructuredSelector({
  currentBlockIndex: makeSelectCurrentNarratorBlockIndex(),
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
