import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import UrlPreview from 'components/UrlPreview';
import Column from 'components/Column';
import { IconTooltip, TooltipType } from 'components/Tooltip';
import Comment from 'components/Text/Comment';

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
      <IconTooltip
        id="external-url-warning"
        type={TooltipType.WARNING}
        content={
          <Comment>{formatMessage(messages.wcagExternalLinkWarning)}</Comment>
        }
      >
        <UrlPreview handleClick={onClick} link={payload} />
      </IconTooltip>
    </Column>
  );
};

UrlQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func,
};

export default UrlQuestion;
