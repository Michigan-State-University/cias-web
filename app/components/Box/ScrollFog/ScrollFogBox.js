import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from 'components/Box/index';

import useScrollInfo from 'utils/useScrollInfo';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import { BottomFog, LeftFog, RightFog, TopFog } from './styled';

const ScrollFogBox = React.forwardRef(
  (
    {
      children,
      horizontalFogVisible,
      verticalFogVisible,
      leftMargin,
      rightMargin,
      topMargin,
      bottomMargin,
      ...props
    },
    ref,
  ) => {
    const [scrollInfo, setRef] = useScrollInfo();

    const [rightFogVisible, setRightFogVisible] = useState(false);
    const [leftFogVisible, setLeftFogVisible] = useState(false);
    const [topFogVisible, setTopFogVisible] = useState(false);
    const [bottomFogVisible, setBottomFogVisible] = useState(false);

    const setRight = (value) =>
      rightFogVisible !== value && setRightFogVisible(value);
    const setLeft = (value) =>
      leftFogVisible !== value && setLeftFogVisible(value);
    const setTop = (value) =>
      topFogVisible !== value && setTopFogVisible(value);
    const setBottom = (value) =>
      bottomFogVisible !== value && setBottomFogVisible(value);

    const { x, y } = scrollInfo;

    const horizontalFog =
      horizontalFogVisible && !isNullOrUndefined(x.percentage);

    const verticalFog = verticalFogVisible && !isNullOrUndefined(y.percentage);

    useEffect(() => {
      if (horizontalFog) {
        if (x.percentage !== 0) setLeft(true);
        else setLeft(false);

        if (x.percentage !== 1) setRight(true);
        else setRight(false);
      } else {
        setLeft(false);
        setRight(false);
      }

      if (verticalFog) {
        if (y.percentage !== 0) setTop(true);
        else setTop(false);

        if (y.percentage < 1) setBottom(true);
        else setBottom(false);
      } else {
        setTop(false);
        setBottom(false);
      }
    }, [x.percentage, y.percentage, horizontalFog, verticalFog]);

    return (
      <Box ref={ref} position="relative" width="100%" height="100%">
        {leftFogVisible && <LeftFog leftMargin={leftMargin} />}
        {rightFogVisible && <RightFog rightMargin={rightMargin} />}
        {topFogVisible && <TopFog topMargin={topMargin} />}
        {bottomFogVisible && <BottomFog bottomMargin={bottomMargin} />}
        <Box disableScrollbar ref={setRef} {...props}>
          {children}
        </Box>
      </Box>
    );
  },
);

ScrollFogBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  horizontalFogVisible: PropTypes.bool,
  verticalFogVisible: PropTypes.bool,
  leftMargin: PropTypes.number,
  rightMargin: PropTypes.number,
  topMargin: PropTypes.number,
  bottomMargin: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

ScrollFogBox.defaultProps = {
  horizontalFogVisible: true,
  verticalFogVisible: true,
  height: 'inherit',
};

export default ScrollFogBox;
