import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';

import Row from 'components/Row';
import Img from 'components/Img';
import H3 from 'components/H3';
import Dropdown from 'components/Dropdown';
import Comment from 'components/Text/Comment';
import Column from 'components/Column';
import gear from 'assets/svg/gear.svg';
import gearSelected from 'assets/svg/gear-selected.svg';

import Box from 'components/Box';
import { colors } from 'theme';

import { ToggleableBox } from './styled';

import {
  selectQuestion,
  toggleQuestionSettings,
  deleteQuestion,
  createQuestionRequest,
} from '../../containers/EditInterventionPage/actions';

import { makeSelectQuestionSettingsVisibility } from '../../containers/EditInterventionPage/selectors';

import messages from './messages';

const QuestionListItem = ({
  question,
  index,
  onSelect,
  isSelected,
  settingsVisibility,
  toggleSettings,
  removeQuestion,
  createQuestion,
  match: { params },
}) => {
  const gearIcon = settingsVisibility && isSelected ? gearSelected : gear;
  const { type, title, id } = question;

  const options = [
    {
      id: 'delete',
      label: <FormattedMessage {...messages.delete} />,
      action: () => removeQuestion(id),
      color: colors.flamingo,
    },
    {
      id: 'copy',
      label: <FormattedMessage {...messages.copy} />,
      action: () => createQuestion(cloneDeep(question), params.id),
      color: colors.black,
    },
  ];

  return (
    <ToggleableBox
      px={21}
      py={14}
      mb={36}
      width="100%"
      onClick={() => onSelect(index)}
      isSelected={isSelected}
    >
      <Row>
        <Column xs={1}>
          <Box
            onClick={event => {
              event.stopPropagation();
              toggleSettings(index);
              onSelect(index);
            }}
          >
            <Img src={gearIcon} />
          </Box>
        </Column>
        <Column xs={10}>
          <Row>
            <H3 mb={6}>{title}</H3>
          </Row>
          <Row>
            <Comment fontWeight="bold">{type}</Comment>
          </Row>
        </Column>
        <Column xs={1}>
          <Dropdown
            options={options}
            additionalAction={() => onSelect(index)}
          />
        </Column>
      </Row>
    </ToggleableBox>
  );
};

QuestionListItem.propTypes = {
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  settingsVisibility: PropTypes.bool,
  toggleSettings: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  settingsVisibility: makeSelectQuestionSettingsVisibility(),
});

const mapDispatchToProps = {
  onSelect: selectQuestion,
  toggleSettings: toggleQuestionSettings,
  removeQuestion: deleteQuestion,
  createQuestion: createQuestionRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(QuestionListItem);
