import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import Text from 'components/Text';

import Img from 'components/Img';
import Badge from 'components/Badge';

import webpage from 'assets/svg/webpage-mouseover.svg';

import {
  makeSelectIntervention,
  makeSelectQuestions,
  makeSelectSelectedQuestion,
} from 'containers/Interventions/containers/EditInterventionPage/selectors';

import { colors, boxShadows } from 'theme';
import Question from 'models/Intervention/Question';
import { getAllVariables } from 'models/Intervention/utils';

const VariableChooser = ({
  onClick,
  questions,
  selectedQuestion: { id } = {},
  visible,
}) => {
  const variables = getAllVariables(questions, {
    structure: 'flat',
    include: ['id', 'title'],
  });

  return (
    <Box
      bg={colors.white}
      borderRadius={10}
      shadow={boxShadows[1]}
      position="absolute"
      width="auto"
      right="0px"
      {...(visible ? { zIndex: 1 } : { display: 'none' })}
    >
      <Row>
        <Box padding={8} filled>
          <Column>
            {variables.map((variable, index) => (
              <Row
                key={`${id}-select-target-${index}`}
                mb={index !== variables.length - 1 && 15}
                onClick={() => onClick(variable.variable)}
                justify="between"
                align="center"
                clickable
              >
                <Row align="center">
                  <Img src={webpage} mr={15} />
                  <Text
                    textOverflow="ellipsis"
                    whiteSpace="pre"
                    overflow="hidden"
                    mr={20}
                  >
                    {variable.title}
                  </Text>
                </Row>
                <Badge>{variable.variable && variable.variable.trim()}</Badge>
              </Row>
            ))}
          </Column>
        </Box>
      </Row>
    </Box>
  );
};

VariableChooser.propTypes = {
  onClick: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape(Question)),
  selectedQuestion: PropTypes.shape(Question),
  visible: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
  questions: makeSelectQuestions(),
  selectedQuestion: makeSelectSelectedQuestion(),
});

const withConnect = connect(mapStateToProps);

export default injectIntl(compose(withConnect)(VariableChooser));
