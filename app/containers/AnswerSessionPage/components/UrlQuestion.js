import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Session/Question';
import UrlPreview from 'components/UrlPreview';

const UrlQuestion = ({ question, selectAnswer }) => {
  const {
    body: {
      variable: { name },
      data: [{ payload }],
    },
  } = question;

  const changeLinkState = state => {
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
  return <UrlPreview handleClick={onClick} link={payload} />;
};

UrlQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
};

export default UrlQuestion;
