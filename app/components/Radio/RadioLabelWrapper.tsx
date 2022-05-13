import React, { memo, ReactNode } from 'react';

import { LabelPosition } from './constants';

type Props = {
  children: ReactNode;
  labelPosition: LabelPosition;
};

const RadioLabelWrapper = ({
  children,
  labelPosition = LabelPosition.Left,
}: Props): JSX.Element => {
  const [Radio, Label] = children as JSX.Element[];

  return (
    <>
      {labelPosition === LabelPosition.Left && Label}

      {Radio}

      {labelPosition === LabelPosition.Right && Label}
    </>
  );
};

export default memo(RadioLabelWrapper);
