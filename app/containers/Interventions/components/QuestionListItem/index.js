import React from 'react';
import PropTypes from 'prop-types';
import set from 'lodash/set';
import uniqueId from 'lodash/uniqueId';
import cloneDeep from 'lodash/cloneDeep';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, FormattedMessage } from 'react-intl';

import Row from 'components/Row';
import Img from 'components/Img';
import H3 from 'components/H3';
import Dropdown from 'components/Dropdown';
import Comment from 'components/Text/Comment';
import Column from 'components/Column';
import Badge from 'components/Badge';
import Box from 'components/Box';
import gear from 'assets/svg/gear.svg';
import gearSelected from 'assets/svg/gear-selected.svg';

import globalMessages from 'global/i18n/globalMessages';
import { hasObjectProperty } from 'utils/hasObjectProperty';
import { colors } from 'theme';

import { ToggleableBox } from './styled';

import {
  selectQuestion,
  toggleQuestionSettings,
  deleteQuestion,
  copyQuestionRequest,
} from '../../containers/EditInterventionPage/actions';

import { makeSelectQuestionSettingsVisibility } from '../../containers/EditInterventionPage/selectors';

import messages from './messages';
import getIndex from './utils';

const QuestionListItem = ({
  question,
  index,
  onSelect,
  selectedQuestionIndex,
  questionsLength,
  settingsVisibility,
  toggleSettings,
  removeQuestion,
  intl: { formatMessage },
  copyQuestion,
  interventionId,
}) => {
  const isSelected = selectedQuestionIndex === index;
  const gearIcon = settingsVisibility && isSelected ? gearSelected : gear;
  const { type, title, id, body } = question;

  const handleDelete = event => {
    event.stopPropagation();
    const newIndex = getIndex(selectedQuestionIndex, questionsLength);
    onSelect(newIndex);
    removeQuestion({ questionId: id, interventionId });
  };

  const handleCopy = () => {
    const copied = cloneDeep(question);
    set(copied, 'id', uniqueId());
    copyQuestion({ copied, questionId: id, interventionId });
  };

  const options = [
    {
      id: 'delete',
      label: <FormattedMessage {...messages.delete} />,
      action: handleDelete,
      color: colors.flamingo,
    },
    {
      id: 'copy',
      label: <FormattedMessage {...messages.copy} />,
      action: handleCopy,
      color: colors.black,
    },
  ];

  const onGearClick = () => {
    toggleSettings(index);
  };

  const onChangeItem = () => {
    onSelect(index);
  };

  return (
    <ToggleableBox
      px={21}
      py={14}
      mb={36}
      width="100%"
      onClick={onChangeItem}
      isSelected={isSelected}
    >
      <Row>
        <Column xs={1}>
          <Box onClick={onGearClick}>
            <Img src={gearIcon} />
          </Box>
        </Column>
        <Column xs={10}>
          <Row>
            <H3 mb={6}>{title}</H3>
          </Row>
          <Row>
            <Comment fontWeight="bold">
              {formatMessage(globalMessages.questionTypes[type])}
            </Comment>
          </Row>
          {hasObjectProperty(body, 'variable') && (
            <Row mt={5}>
              <Badge>
                {(body.variable.name && body.variable.name.trim()) ||
                  formatMessage(globalMessages.variables.emptyBadge)}
              </Badge>
            </Row>
          )}
        </Column>
        <Column xs={1}>
          <Dropdown options={options} id={id} />
        </Column>
      </Row>
    </ToggleableBox>
  );
};

QuestionListItem.propTypes = {
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedQuestionIndex: PropTypes.number,
  questionsLength: PropTypes.number,
  settingsVisibility: PropTypes.bool,
  toggleSettings: PropTypes.func,
  copyQuestion: PropTypes.func,
  intl: PropTypes.object,
  removeQuestion: PropTypes.func,
  interventionId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  settingsVisibility: makeSelectQuestionSettingsVisibility(),
});

const mapDispatchToProps = {
  onSelect: selectQuestion,
  toggleSettings: toggleQuestionSettings,
  removeQuestion: deleteQuestion,
  copyQuestion: copyQuestionRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(QuestionListItem));
