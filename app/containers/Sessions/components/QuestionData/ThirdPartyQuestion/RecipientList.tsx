import React, { FC, ReactNode, useMemo } from 'react';

import { isLast } from 'utils/arrayUtils';

import { MarginProps } from 'components/BaseComponentStyles';
import Row from 'components/Row';
import { EllipsisText } from 'components/Text';

export type Props = {
  label: ReactNode;
  noItemsLabel: ReactNode;
  recipients: string[];
} & MarginProps;

export const RecipientList: FC<Props> = ({
  label,
  noItemsLabel,
  recipients,
  ...props
}) => {
  const text = useMemo(() => {
    if (recipients.length)
      return (
        <>
          {label}
          {` (${recipients.length}): `}
          {recipients.map(
            (recipient, index) =>
              `${recipient}${isLast(recipients, index) ? '' : ', '}`,
          )}
        </>
      );
    return noItemsLabel;
  }, [label, noItemsLabel, recipients]);

  return (
    <Row {...props}>
      <EllipsisText
        lineHeight={1.5}
        opacity={0.7}
        id={`${label}`}
        text={text}
      ></EllipsisText>
    </Row>
  );
};
