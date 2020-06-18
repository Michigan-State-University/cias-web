import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Row from 'components/Row';
import Column from 'components/Column';
import H3 from 'components/H3';
import Tabs from 'components/Tabs';
import Switch from 'components/Switch';

import messages from './messages';
import { updateSettings } from './actions';

import { makeSelectOnePropertyFromSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';

const DefaultSettings = ({ settings, onToggle, intl: { formatMessage } }) => (
  <Column>
    <Tabs>
      <div label="Settings">
        {map(settings, (val, index) => (
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
      </div>
      <div label="Narrator">Narrator</div>
    </Tabs>
  </Column>
);

DefaultSettings.propTypes = {
  intl: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  settings: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  settings: makeSelectOnePropertyFromSelectedQuestion('settings'),
});

const mapDispatchToProps = {
  onToggle: updateSettings,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(DefaultSettings));
