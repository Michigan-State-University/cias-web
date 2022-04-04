import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'components/Tooltip';
import Row from 'components/Row';

import { StyledEllipsisText } from './styled';

const EllipsisText = ({ text, dataFor, lines, width, ...props }) => {
  const ref = useRef(null);

  const [allowTooltip, setAllowTooltip] = useState(false);

  const onTruncate = (isTruncated) => {
    setAllowTooltip(isTruncated);
  };

  return (
    <Row width="100%">
      <Tooltip
        visible={allowTooltip}
        text={text}
        id={text ?? ''}
        display="inline"
        width="100%"
      >
        <StyledEllipsisText
          ref={ref}
          data-tip={text}
          data-for={dataFor ?? text ?? ''}
          lines={lines}
          onTruncate={onTruncate}
          width={width}
          $styleProps={props}
        >
          {text}
        </StyledEllipsisText>
      </Tooltip>
    </Row>
  );
};

EllipsisText.propTypes = {
  text: PropTypes.string,
  dataFor: PropTypes.string,
  lines: PropTypes.number,
  width: PropTypes.number,
};

EllipsisText.defaultProps = {
  lines: 1,
};

export default memo(EllipsisText);
