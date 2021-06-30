import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'components/Tooltip';
import Row from 'components/Row';

import { StyledEllipsisText } from './styled';

const EllipsisText = ({ text, dataFor, lines, ...props }) => {
  const ref = useRef(null);

  const [allowTooltip, setAllowTooltip] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const onTruncate = isTruncated => {
    setAllowTooltip(isTruncated);
  };

  const isTooltipVisible = isHovered && allowTooltip;

  return (
    <Row width="100%" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
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

      {isTooltipVisible && (
        <Tooltip text={text} id={text ?? ''} display="inline" />
      )}
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

export default memo(EllipsisText);
