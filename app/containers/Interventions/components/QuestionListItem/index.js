import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import uniqueId from 'lodash/uniqueId';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, FormattedMessage } from 'react-intl';
import unescape from 'lodash/unescape';

import Badge from 'components/Badge';
import Column from 'components/Column';
import Comment from 'components/Text/Comment';
import Dropdown from 'components/Dropdown';
import Row from 'components/Row';
import globalMessages from 'global/i18n/globalMessages';
import { colors } from 'theme';
import { getNarratorPositionWhenQuestionIsChanged } from 'utils/getNarratorPosition';
import { hasObjectProperty } from 'utils/hasObjectProperty';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import {
  selectQuestion,
  deleteQuestionRequest,
  copyQuestionRequest,
} from 'global/reducers/questions';
import {
  setQuestionSettings,
  makeSelectQuestionSettingsVisibility,
  setAnimationStopPosition,
  setCharacterDraggable,
  changeCurrentNarratorBlock,
} from 'global/reducers/localState';

import StyledCircle from 'components/Circle/StyledCircle';
import { QuestionTypes } from 'models/Intervention/QuestionTypes';
import Box from 'components/Box';
import Radio from 'components/Radio';
import { ToggleableBox, ClampedTitle } from './styled';
import messages from './messages';
import getIndex from './utils';

const QuestionListItem = ({
  question,
  index,
  onSelect,
  selectedQuestionIndex,
  questions,
  toggleSettings,
  removeQuestion,
  intl: { formatMessage },
  copyQuestion,
  interventionId,
  changeNarratorBlockIndex,
  setDraggable,
  setCharacterPosition,
  checked,
  selectSlide,
  manage,
  disabled,
}) => {
  const { type, subtitle, id, body } = question;
  const isSelected = selectedQuestionIndex === id;

  const handleSelectClick = newIndex => {
    setDraggable(false);
    if (selectedQuestionIndex !== id) {
      onSelect(id);
      const newPosition = getNarratorPositionWhenQuestionIsChanged(
        questions,
        newIndex,
      );
      setCharacterPosition(newPosition.x, newPosition.y);
    }
  };

  const handleDelete = () => {
    const newIndex = getIndex(selectedQuestionIndex, questions.length);
    handleSelectClick(newIndex);
    removeQuestion({ questionId: id, interventionId });
  };

  const handleCopy = () => {
    const copied = cloneDeep(question);
    set(copied, 'id', uniqueId());
    copyQuestion({ copied, questionId: id });
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

  const onChangeItem = () => {
    handleSelectClick(index);
    changeNarratorBlockIndex(-1);
    toggleSettings({ index, questionIndex: selectedQuestionIndex });
  };

  return (
    <ToggleableBox
      padding={15}
      mb={15}
      width="100%"
      onClick={onChangeItem}
      isSelected={isSelected}
      bg="#F8FBFF"
      border={`1px solid ${checked ? '#C866EA' : '#EFEFEF'}`}
    >
      <Row justify="between">
        {manage && (
          <Column xs={1}>
            <Radio
              onClick={e => {
                selectSlide(id);
                e.stopPropagation();
              }}
              checked={checked}
            />
          </Column>
        )}
        <Column xs={10}>
          <Row>
            <ClampedTitle mb={6}>
              {unescape(htmlToPlainText(subtitle))}
            </ClampedTitle>
          </Row>
          <Row>
            <Box display="flex" align="center">
              <StyledCircle
                background={
                  QuestionTypes.find(({ id: typeId }) => typeId === type).color
                }
                size="10px"
                mr="5px"
              />
              <Comment fontWeight="bold">
                {formatMessage(globalMessages.questionTypes[type])}
              </Comment>
            </Box>
          </Row>
          {body && hasObjectProperty(body, 'variable') && (
            <Row mt={5}>
              <Badge color={colors.jungleGreen} bgWithOpacity>
                {(body.variable.name && body.variable.name.trim()) ||
                  formatMessage(globalMessages.variables.emptyVariable)}
              </Badge>
            </Row>
          )}
        </Column>
        {!manage && !disabled && (
          <Column xs={1}>
            <Dropdown options={options} />
          </Column>
        )}
      </Row>
    </ToggleableBox>
  );
};

QuestionListItem.propTypes = {
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedQuestionIndex: PropTypes.string,
  questions: PropTypes.array,
  settingsVisibility: PropTypes.bool,
  toggleSettings: PropTypes.func,
  copyQuestion: PropTypes.func,
  intl: PropTypes.object,
  removeQuestion: PropTypes.func,
  interventionId: PropTypes.string,
  changeNarratorBlockIndex: PropTypes.func,
  setDraggable: PropTypes.func,
  setCharacterPosition: PropTypes.func,
  checked: PropTypes.bool,
  manage: PropTypes.bool,
  selectSlide: PropTypes.func,
  disabled: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  settingsVisibility: makeSelectQuestionSettingsVisibility(),
});

const mapDispatchToProps = {
  onSelect: selectQuestion,
  toggleSettings: setQuestionSettings,
  removeQuestion: deleteQuestionRequest,
  copyQuestion: copyQuestionRequest,
  changeNarratorBlockIndex: changeCurrentNarratorBlock,
  setDraggable: setCharacterDraggable,
  setCharacterPosition: setAnimationStopPosition,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(QuestionListItem));
