import React from 'react';
import PropTypes from 'prop-types';
import gear from 'assets/svg/gear.svg';
import ScreenType from 'models/Intervention/ScreenType';
import Question from 'models/Intervention/Question';
import Column from 'components/Column';
import Row from 'components/Row';
import Img from 'components/Img';
import Circle from 'components/Circle';
import H3 from 'components/H3';
import Comment from 'components/Comment';

const ScreenListItem = ({ type, question }) => (
  <Row>
    <Column xs={2}>
      <Circle size="23px" child={1} opacity={0.3} />
    </Column>
    <Column xs={8}>
      <Row>
        <H3 mb={6}>{question.text}</H3>
      </Row>
      <Row>
        <Comment fontWeight="bold">{type.name}</Comment>
      </Row>
    </Column>
    <Column xs={2}>
      <Img src={gear} />
    </Column>
  </Row>
);

ScreenListItem.propTypes = {
  type: PropTypes.shape(ScreenType).isRequired,
  question: PropTypes.shape(Question).isRequired,
};

export default ScreenListItem;
