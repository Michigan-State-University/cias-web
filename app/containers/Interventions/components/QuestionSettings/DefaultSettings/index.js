import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import Row from 'components/Row';
import Column from 'components/Column';
import H3 from 'components/H3';
import Accordion from 'components/Accordion';
import Tabs from 'components/Tabs';
import Switch from 'components/Switch';
import Box from 'components/Box';

import messages from './messages';
import { updateSettings } from './actions';

import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';

const DefaultSettings = ({
  selectedQuestion: { settings, id } = {},
  onToggle,
  intl: { formatMessage },
}) => (
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
      <div label={formatMessage(messages.narrator)}>Narrator</div>
        <Accordion>
          <Box label="label 1" color="#000">
            x
          </Box>
          <Box label="label 2" color="#523345">
            x2
          </Box>
        </Accordion>
      </div>
    </Tabs>
  </Column>
);

DefaultSettings.propTypes = {
  intl: intlShape,
  onToggle: PropTypes.func.isRequired,
  selectedQuestion: PropTypes.object,
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
