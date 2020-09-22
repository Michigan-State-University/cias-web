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
import Box from 'components/Box';
import Column from 'components/Column';
import Comment from 'components/Text/Comment';
import Dropdown from 'components/Dropdown';
import Img from 'components/Img';
import Row from 'components/Row';
import gear from 'assets/svg/gear.svg';
import gearSelected from 'assets/svg/gear-selected.svg';
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
  toggleQuestionSettings,
  makeSelectQuestionSettingsVisibility,
  setAnimationStopPosition,
  setCharacterDraggable,
  changeCurrentNarratorBlock,
} from 'global/reducers/localState';

import { ToggleableBox, ClampedTitle } from './styled';
import messages from './messages';
import getIndex from './utils';

const QuestionListItem = ({
  question,
  index,
  onSelect,
  selectedQuestionIndex,
  questions,
  settingsVisibility,
  toggleSettings,
  removeQuestion,
  intl: { formatMessage },
  copyQuestion,
  interventionId,
  changeNarratorBlockIndex,
  setDraggable,
  setCharacterPosition,
}) => {
  const isSelected = selectedQuestionIndex === index;
  const gearIcon = settingsVisibility && isSelected ? gearSelected : gear;
  const { type, subtitle, id, body } = question;

  const handleSelectClick = newIndex => {
    setDraggable(false);
    if (selectedQuestionIndex !== newIndex) {
      onSelect(newIndex);
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

  const onGearClick = () => {
    toggleSettings({ index, questionIndex: selectedQuestionIndex });
  };

  const onChangeItem = () => {
    handleSelectClick(index);
    changeNarratorBlockIndex(-1);
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
            <ClampedTitle mb={6}>
              {unescape(htmlToPlainText(subtitle))}
            </ClampedTitle>
          </Row>
          <Row>
            <Comment fontWeight="bold">
              {formatMessage(globalMessages.questionTypes[type])}
            </Comment>
          </Row>
          {body && hasObjectProperty(body, 'variable') && (
            <Row mt={5}>
              <Badge color={colors.jungleGreen} bgWithOpacity>
                {(body.variable.name && body.variable.name.trim()) ||
                  formatMessage(globalMessages.variables.emptyBadge)}
              </Badge>
            </Row>
          )}
        </Column>
        <Column xs={1}>
          <Dropdown options={options} />
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
};

const mapStateToProps = createStructuredSelector({
  settingsVisibility: makeSelectQuestionSettingsVisibility(),
});

const mapDispatchToProps = {
  onSelect: selectQuestion,
  toggleSettings: toggleQuestionSettings,
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
