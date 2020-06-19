import React, { useState } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import { blockTypeToColorMap } from 'models/Narrator/BlockTypes';

import Row from 'components/Row';
import Column from 'components/Column';
import H3 from 'components/H3';
import Accordion from 'components/Accordion';
import Collapse from 'components/Accordion/Collapse';
import Tabs from 'components/Tabs';
import Switch from 'components/Switch';
import Box from 'components/Box';

import messages from './messages';
import { updateSettings } from './actions';

import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';
import { DashedBox } from './styled';
import BlockTypeChooser from '../BlockTypeChooser';

const DefaultSettings = ({
  selectedQuestion: { narrator, settings, id } = {},
  onToggle,
  questionId,
  intl: { formatMessage },
}) => {
  const [typeChooserOpen, setTypeChooserOpen] = useState(false);

  const toggleTypeChooser = () => setTypeChooserOpen(!typeChooserOpen);

  // const onCreateBlock = type => {
  //   createQuestion(
  //     instantiateEmptyQuestion(
  //       formatMessage(messages.newQuestionMessage),
  //       type,
  //     ),
  //   );
  //   toggleTypeChooser();
  // };

  return (
    <Column>
      <Tabs>
        <div label={formatMessage(messages.settings)}>
          {map(settings, (val, index) => (
            <Row
              key={`el-settings-${id}-${index}`}
              justify="between"
              align="center"
              mb={15}
            >
              <H3>{formatMessage(messages[`${index}`])}</H3>
              <Switch
                checked={val}
                onToggle={value => onToggle(`${index}`, value)}
              />
            </Row>
          ))}
        </div>
        <div label={formatMessage(messages.narrator)}>
          <Box mb={30}>
            {narrator &&
              map(narrator.settings, (val, index) => (
                <Row
                  key={`el-settings-${index}`}
                  justify="between"
                  align="center"
                  mb={15}
                >
                  <H3>{formatMessage(messages[`${index}`])}</H3>
                  <Switch
                    checked={val}
                    onToggle={value => onToggle(`${index}`, value)}
                  />
                </Row>
              ))}
          </Box>
          <Accordion>
            {narrator &&
              map(narrator.steps, (step, index) => (
                <Collapse
                  key={`${questionId}-narrator-${index}`}
                  label={step.type}
                  color={blockTypeToColorMap[step.type]}
                >
                  test
                </Collapse>
              ))}
          </Accordion>
          <Box position="relative">
            <DashedBox onClick={toggleTypeChooser}>
              {formatMessage(messages.newStep)}
            </DashedBox>
            <BlockTypeChooser
              visible={typeChooserOpen}
              // onClick={onCreateQuestion}
            />
          </Box>
        </div>
      </Tabs>
    </Column>
  );
};

DefaultSettings.propTypes = {
  intl: intlShape,
  onToggle: PropTypes.func.isRequired,
  selectedQuestion: PropTypes.object,
  questionId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  onToggle: updateSettings,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(DefaultSettings));
