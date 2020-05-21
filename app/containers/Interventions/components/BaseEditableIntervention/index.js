import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import Img from 'components/Img';
import cross from 'assets/svg/cross.svg';
import H1 from 'components/H1';
import Intervention from 'models/Intervention/Intervention';
import Text from 'components/Text';
import HoverableBox from 'components/Box/HoverableBox';
import { themeColors } from 'theme/colors';
import { PlusCircle } from './styled';
import messages from './messages';
import QuestionListItem from '../QuestionListItem';
import QuestionTypeChooser from '../QuestionTypeChooser';

const BaseEditableIntervention = ({
  intl: { formatMessage },
  intervention,
}) => (
  <Row>
    <Column sm={5}>
      <Box padded>
        <Row mb={77}>
          <Img src={cross} mr={37} />
          <H1>{formatMessage(messages.pageTitle)}</H1>
        </Row>

        <Box width="100%" padded>
          <Row>
            {intervention.questions.map(question => (
              <QuestionListItem type={question.type} title={question.title} />
            ))}
          </Row>
          <Row>
            <HoverableBox px={21} py={14}>
              <Row align="center">
                <PlusCircle mr={12} clickable />
                <Text fontWeight="bold" color={themeColors.secondary}>
                  {formatMessage(messages.addScreen)}
                </Text>
              </Row>
            </HoverableBox>
          </Row>
          <Row>
            <QuestionTypeChooser />
          </Row>
        </Box>
      </Box>
    </Column>
    <Column sm={7}>col2</Column>
  </Row>
);

BaseEditableIntervention.propTypes = {
  intl: PropTypes.object,
  intervention: PropTypes.shape(Intervention),
};

export default injectIntl(BaseEditableIntervention);
