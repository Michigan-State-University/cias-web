import React from 'react';
import PropTypes from 'prop-types';
import gear from 'assets/svg/gear.svg';
import Column from 'components/Column';
import Row from 'components/Row';
import Img from 'components/Img';
import H3 from 'components/H3';
import Comment from 'components/Text/Comment';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Question from 'models/Intervention/Question';
import { selectQuestion } from '../../containers/EditInterventionPage/actions';
import { NumberCircle, ToggleableBox } from './styled';

const QuestionListItem = ({
  question: { type, title },
  index,
  onSelect,
  isSelected,
}) => (
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
        <NumberCircle isSelected={isSelected} child={index + 1} />
      </Column>
      <Column xs={8}>
        <Row>
          <H3 mb={6}>{title}</H3>
        </Row>
        <Row>
          <Comment fontWeight="bold">{type.name}</Comment>
        </Row>
      </Column>
      <Column xs={2}>
        <Img src={gear} />
      </Column>
    </Row>
  </ToggleableBox>
);

QuestionListItem.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  index: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  onSelect: index => dispatch(selectQuestion(index)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(QuestionListItem);
