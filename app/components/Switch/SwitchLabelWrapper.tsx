import React, { memo, ReactNode } from 'react';

import Row from 'components/Row';
import { LayoutProps } from 'components/BaseComponentStyles';

import { LabelPosition } from './constants';

type Props = {
  children: ReactNode;
  labelPosition: LabelPosition;
} & LayoutProps;

const SwitchLabelWrapper = ({
  children,
  labelPosition = LabelPosition.Left,
  ...props
}: Props): JSX.Element => {
  const [Switch, Label] = children as JSX.Element[];

  if (!Label) return Switch;

  return (
    <Row justify="between" align="center" width="100%" {...props}>
      {labelPosition === LabelPosition.Left && Label}

      {Switch}

      {labelPosition === LabelPosition.Right && Label}
    </Row>
  );
};

export default memo(SwitchLabelWrapper);
