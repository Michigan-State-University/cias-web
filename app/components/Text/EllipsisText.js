import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'components/Tooltip';
import Row from 'components/Row';

import { StyledEllipsisText } from './styled';

const EllipsisText = ({ text, dataFor, lines, ...props }) => {
  const ref = useRef(null);
  const [allowTooltip, setAllowTooltip] = useState(false);

  const onTruncate = isTruncated => {
    setAllowTooltip(isTruncated);
  };

  return (
    <Row width="100%">
      {allowTooltip && <Tooltip text={text} id={text ?? ''} display="inline" />}

      <StyledEllipsisText
        ref={ref}
        data-tip={text}
        data-for={dataFor ?? text ?? ''}
        lines={lines}
        onTruncate={onTruncate}
        $styleProps={props}
      >
        {text}
      </StyledEllipsisText>
    </Row>
  );
};

EllipsisText.propTypes = {
  text: PropTypes.string,
  dataFor: PropTypes.string,
  lines: PropTypes.number,
};

EllipsisText.defaultProps = {
  lines: 1,
};

export default EllipsisText;
