import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Row from 'components/Row';
import Img from 'components/Img';
import H3 from 'components/H3';
import Comment from 'components/Text/Comment';
import Column from 'components/Column';
import gear from 'assets/svg/gear.svg';
import gearSelected from 'assets/svg/gear-selected.svg';

import Box from 'components/Box';

import { ToggleableBox } from './styled';

import {
  selectQuestion,
  toggleQuestionSettings,
} from '../../containers/EditInterventionPage/actions';

import { makeSelectQuestionSettingsVisibility } from '../../containers/EditInterventionPage/selectors';

const QuestionListItem = ({
  question: { type, title },
  index,
  onSelect,
  isSelected,
  settingsVisibility,
  toggleSettings,
}) => {
  const gearIcon = settingsVisibility && isSelected ? gearSelected : gear;

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
        <Column xs={2}>
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
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(QuestionListItem);
