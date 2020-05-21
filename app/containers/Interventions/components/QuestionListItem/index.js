import React from 'react';
import PropTypes from 'prop-types';
import gear from 'assets/svg/gear.svg';
import QuestionType from 'models/Intervention/QuestionType';
import Column from 'components/Column';
import Row from 'components/Row';
import Img from 'components/Img';
import H3 from 'components/H3';
import Comment from 'components/Text/Comment';
import { NumberCircle } from './styled';
import HoverableBox from '../../../../components/Box/HoverableBox';

const QuestionListItem = ({ type, title }) => (
  <HoverableBox px={21} py={14} mb={36}>
    <Row>
      <Column xs={2}>
        <NumberCircle child="1" />
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
  </HoverableBox>
);

QuestionListItem.propTypes = {
  type: PropTypes.shape(QuestionType).isRequired,
  title: PropTypes.string,
};

export default QuestionListItem;
