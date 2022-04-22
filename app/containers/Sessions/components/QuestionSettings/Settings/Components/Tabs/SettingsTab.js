import React, { memo } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { colors, borders } from 'theme';
import lastKey from 'utils/getLastKey';
import { feedbackQuestion } from 'models/Session/QuestionTypes';

import SpectrumSettings from 'containers/Sessions/components/QuestionData/FeedbackQuestion/SpectrumSettings';
import Box from 'components/Box';
import SettingsOption from './SettingsOption';

import { updateSettings as updateQuestionSettings } from '../../actions';
import { orderSettings } from './utils';

const SettingsTab = ({ settings, type, onQuestionToggle, id, disabled }) => {
  const orderedSettings = orderSettings(settings);
  const last = lastKey(orderedSettings);

  const renderQuestionSpecificSettings = (editingDisabled) => {
    let component;

    switch (type) {
      case feedbackQuestion.id:
        component = <SpectrumSettings disabled={editingDisabled} />;
        break;
      default:
        component = null;
        break;
    }

    if (component)
      return (
        <Box
          borderTop={`${borders.borderWidth} ${borders.borderStyle} ${colors.linkWater}`}
        >
          {component}
        </Box>
      );

    return null;
  };

  return (
    <>
      {map(orderedSettings, (val, index) => (
        <SettingsOption
          key={`el-settings-${id}-${index}`}
          index={index}
          disabled={disabled}
          setting={val}
          onUpdate={onQuestionToggle}
          isLast={index === last}
        />
      ))}
      {renderQuestionSpecificSettings(disabled)}
    </>
  );
};

SettingsTab.propTypes = {
  onQuestionToggle: PropTypes.func.isRequired,
  settings: PropTypes.object,
  type: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
};

const mapDispatchToProps = {
  onQuestionToggle: updateQuestionSettings,
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(SettingsTab);
