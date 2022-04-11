import React, { memo, ReactNode } from 'react';

import Row from 'components/Row';

import { LabelPosition } from './constants';

type Props = {
  children: ReactNode;
  labelPosition: LabelPosition;
};

const SwitchLabelWrapper = ({
  children,
  labelPosition = LabelPosition.Left,
}: Props): JSX.Element => {
  const [Switch, Label] = children as JSX.Element[];

  if (!Label) return Switch;

  return (
    <Row justify="between" align="center" width="100%">
      {labelPosition === LabelPosition.Left && Label}

      {Switch}

      {labelPosition === LabelPosition.Right && Label}
    </Row>
  );
};

export default memo(SwitchLabelWrapper);
