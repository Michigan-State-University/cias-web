import React, { memo } from 'react';

import { InterventionShareBox } from './InterventionShareBox';
import { SessionShareBox } from './SessionShareBox';
import { ShareBoxType } from './types';

type Props = {
  type: ShareBoxType;
  organizationId?: string;
};

const Component = ({ type, organizationId }: Props): JSX.Element => {
  switch (type) {
    case ShareBoxType.INTERVENTION:
      return <InterventionShareBox organizationId={organizationId} />;
    case ShareBoxType.SESSION:
      return <SessionShareBox organizationId={organizationId} />;
    default:
      return <></>;
  }
};

export const ShareBox = memo(Component);
