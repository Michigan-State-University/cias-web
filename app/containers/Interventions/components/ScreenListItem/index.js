import React from 'react';
import PropTypes from 'prop-types';
import gear from 'assets/svg/gear.svg';
import ScreenType from 'models/Intervention/ScreenType';
import Question from 'models/Intervention/Question';
import Column from 'components/Column';
import Row from 'components/Row';
import Img from 'components/Img';
import H3 from 'components/H3';
import Comment from 'components/Text/Comment';
import { ScreenListCircle } from './styled';
import HoverableBox from '../../../../components/Box/HoverableBox';

const ScreenListItem = ({ type, question }) => (
  <HoverableBox px={21} py={14} mb={36}>
    <Row>
      <Column xs={2}>
        <ScreenListCircle text="1" />
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
  </HoverableBox>
);

ScreenListItem.propTypes = {
  type: PropTypes.shape(ScreenType).isRequired,
  question: PropTypes.shape(Question).isRequired,
};

export default ScreenListItem;
