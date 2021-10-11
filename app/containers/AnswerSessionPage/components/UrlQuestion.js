import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';

import { QuestionDTO } from 'models/Question';

import UrlPreview from 'components/UrlPreview';
import H3 from 'components/H3';
import Column from 'components/Column';

import messages from '../layouts/messages';

const UrlQuestion = ({ question, selectAnswer }) => {
  const { formatMessage } = useIntl();
  const {
    body: {
      variable: { name },
      data: [{ payload }],
    },
  } = question;

  const changeLinkState = (state) => {
    selectAnswer([
      {
        var: name,
        value: state,
      },
    ]);
  };

  useEffect(() => {
    changeLinkState(false);
  }, []);

  const onClick = () => changeLinkState(true);
  return (
    <Column mt={10}>
      <UrlPreview handleClick={onClick} link={payload} />
      <H3 color={themeColors.warning} textAlign="center">
        {formatMessage(messages.wcagExternalLinkWarning)}
      </H3>
    </Column>
  );
};

UrlQuestion.propTypes = {
  question: PropTypes.shape(QuestionDTO).isRequired,
  selectAnswer: PropTypes.func,
};

export default UrlQuestion;
