import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'components/Tooltip';
import Row from 'components/Row';

import { StyledEllipsisText } from './styled';

const EllipsisText = ({ text, ...props }) => {
  const ref = useRef(null);
  const [allowTooltip, setAllowTooltip] = useState(false);

  useEffect(() => {
    if (!allowTooltip && ref.current) {
      const { offsetWidth, scrollWidth } = ref.current;
      if (offsetWidth < scrollWidth) {
        setAllowTooltip(true);
      }
    }
  }, [text]);

  return (
    <Row>
      {allowTooltip ? (
        <Tooltip text={text} id={text ?? ''} width="100%" display="inline">
          <StyledEllipsisText ref={ref} {...props}>
            {text}
          </StyledEllipsisText>
        </Tooltip>
      ) : (
        <StyledEllipsisText ref={ref} {...props}>
          {text}
        </StyledEllipsisText>
      )}
    </Row>
  );
};

EllipsisText.propTypes = {
  text: PropTypes.string,
};

export default EllipsisText;
