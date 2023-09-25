import React, { FC, useState } from 'react';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';

import { colors } from 'theme';

import Collapse from 'components/Collapse';
import Text from 'components/Text';
import Divider from 'components/Divider';
import Row from 'components/Row';

import {
  EmailParticipantsTable,
  Props as EmailParticipantsTableProps,
} from './EmailParticipantsTable';

export type Props = {
  healthClinicName: string;
  healthSystemName: string;
} & EmailParticipantsTableProps;

export const HealthClinicInvitationsCollapse: FC<Props> = ({
  healthClinicName,
  healthSystemName,
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
        label={
          <Row align="center">
            <Row flexGrow={1} flexShrink={0}>
              <Text fontWeight="bold">{healthClinicName}</Text>
            </Row>
            <Text opacity={0.7} fontWeight="bold" mx={8} truncate>
              ({healthSystemName})
            </Text>
          </Row>
        }
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
