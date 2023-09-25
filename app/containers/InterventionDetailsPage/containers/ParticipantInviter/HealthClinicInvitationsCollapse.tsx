import React, { FC, useState } from 'react';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';

import { colors } from 'theme';

import Collapse from 'components/Collapse';
import { EllipsisText } from 'components/Text';
import Divider from 'components/Divider';

import {
  EmailParticipantsTable,
  Props as EmailParticipantsTableProps,
} from './EmailParticipantsTable';

export type Props = {} & EmailParticipantsTableProps;

export const HealthClinicInvitationsCollapse: FC<Props> = ({
  ...restProps
}) => {
  const [opened, setOpened] = useState(false);
  const handleToggle = () => setOpened((value) => !value);

  return (
    <>
      <Collapse
        isOpened={opened}
        onToggle={handleToggle}
        py={21}
        px={8}
        height="auto"
        label={<EllipsisText text="header" fontWeight="bold" />}
        color={colors.white}
        onHideImg={arrowDown}
        onShowImg={arrowUp}
      >
        <EmailParticipantsTable {...restProps} />
      </Collapse>
      <Divider />
    </>
  );
};
