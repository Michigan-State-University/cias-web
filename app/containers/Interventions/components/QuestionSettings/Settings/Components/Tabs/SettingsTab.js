import React, { useMemo, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { map } from 'lodash';

import H3 from 'components/H3';
import Row from 'components/Row';
import Select from 'components/Select';
import Switch from 'components/Switch';
import Text from 'components/Text';
import lastKey from 'utils/getLastKey';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { QuestionTypes } from 'models/Intervention/QuestionTypes';
import { colors, borders } from 'theme';
import { changeQuestionType } from 'containers/Interventions/containers/EditInterventionPage/actions';

import messages from '../messages';
import { updateSettings as updateQuestionSettings } from '../../actions';

const HIDE_CHANGING_QUESTION_TYPE = false;

const orderSettings = settings =>
  settings && {
    video: settings.video,
    image: settings.image,
    title: settings.title,
    subtitle: settings.subtitle,
    ...(!isNullOrUndefined(settings.proceed_button) && {
      proceed_button: settings.proceed_button,
    }),
    ...(!isNullOrUndefined(settings.required) && {
      required: settings.required,
    }),
    ...(!isNullOrUndefined(settings.show_number) && {
      show_number: settings.show_number,
    }),
  };

const SettingsTab = ({
  formatMessage,
  settings,
  type,
  onQuestionToggle,
  changeTypeQuestion,
  id,
}) => {
  const orderedSettings = orderSettings(settings);
  const last = lastKey(orderedSettings);

  const selectOptions = useMemo(
    () =>
      QuestionTypes.map(option => ({
        value: option.id,
        label: option.name,
      })),
    [QuestionTypes],
  );

  const selectedOption = selectOptions.find(option => option.value === type);

  const handleChange = value => {
    changeTypeQuestion(value.value);
  };
  return (
    <Fragment>
      {HIDE_CHANGING_QUESTION_TYPE && (
        <Text fontSize={14} mb={6}>
          <FormattedMessage {...messages.type} />
        </Text>
      )}
      {HIDE_CHANGING_QUESTION_TYPE && (
        <Select
          mb={40}
          selectProps={{
            placeholder: formatMessage(messages.typePlaceholder),
            options: selectOptions,
            value: selectedOption,
            isSearchable: false,
            onChange: handleChange,
          }}
        />
      )}
      {map(orderedSettings, (val, index) => (
        <Row
          key={`el-settings-${id}-${index}`}
          justify="between"
          align="center"
          pb={15}
          mb={15}
          borderBottom={
            index !== last
              ? `${borders.borderWidth} ${borders.borderStyle} ${
                  colors.linkWater
                }`
              : null
          }
        >
          <H3>{formatMessage(messages[`${index}`])}</H3>
          <Switch
            checked={val}
            onToggle={value => onQuestionToggle(`${index}`, value)}
          />
        </Row>
      ))}
    </Fragment>
  );
};

SettingsTab.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  onQuestionToggle: PropTypes.func.isRequired,
  settings: PropTypes.object,
  type: PropTypes.string,
  id: PropTypes.string,
  changeTypeQuestion: PropTypes.func,
};

const mapDispatchToProps = {
  onQuestionToggle: updateQuestionSettings,
  changeTypeQuestion: changeQuestionType,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(SettingsTab);
