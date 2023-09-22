import React, { ReactNode, useMemo } from 'react';

import { isLast } from 'utils/arrayUtils';

import { MarginProps } from 'components/BaseComponentStyles';
import Row from 'components/Row';
import { EllipsisText } from 'components/Text';

export type Props<T> = {
  label: ReactNode;
  noItemsLabel: ReactNode;
  recipients: T[];
  itemFormatter?: (recipient: T) => string;
} & MarginProps;

export const RecipientList = <T,>({
  label,
  noItemsLabel,
  recipients,
  itemFormatter = (recipient) => `${recipient}`,
  ...props
}: Props<T>) => {
  const text = useMemo(() => {
    if (recipients.length)
      return (
        <>
          {label}
          {` (${recipients.length}): `}
          {recipients.map(
            (recipient, index) =>
              `${itemFormatter(recipient)}${
                isLast(recipients, index) ? '' : ', '
              }`,
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
