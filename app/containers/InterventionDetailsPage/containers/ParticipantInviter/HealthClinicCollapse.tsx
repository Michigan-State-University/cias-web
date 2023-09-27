import React, { FC, PropsWithChildren, useState } from 'react';
import { useIntl } from 'react-intl';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';

import { colors } from 'theme';

import Collapse from 'components/Collapse';
import Text from 'components/Text';
import Divider from 'components/Divider';
import Row from 'components/Row';

import { HealthClinicInfo } from './types';
import messages from './messages';

export type Props = PropsWithChildren<{
  healthClinicInfo: Nullable<HealthClinicInfo>;
  openedInitially?: boolean;
}>;

export const HealthClinicCollapse: FC<Props> = ({
  healthClinicInfo,
  children,
  openedInitially = false,
}) => {
  const { formatMessage } = useIntl();

  const [opened, setOpened] = useState(openedInitially);
  const handleToggle = () => setOpened((value) => !value);

  const { healthClinicName, healthSystemName } = healthClinicInfo || {};

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
              <Text fontWeight="bold">
                {healthClinicName ??
                  formatMessage(messages.healthClinicCollapseDefaultLabel)}
              </Text>
            </Row>
            {healthSystemName && (
              <Text opacity={0.7} fontWeight="bold" mx={8} truncate>
                ({healthSystemName})
              </Text>
            )}
          </Row>
        }
        color={colors.white}
        onHideImg={arrowDown}
        onShowImg={arrowUp}
      >
        {children}
      </Collapse>
      <Divider />
    </>
  );
};
