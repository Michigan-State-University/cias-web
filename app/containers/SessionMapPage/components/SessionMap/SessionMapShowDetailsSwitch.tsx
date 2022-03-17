import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';

import Switch, { LabelPosition } from 'components/Switch';
import Divider from 'components/Divider';
import Text from 'components/Text';
import Row from 'components/Row';

import { DIVIDER_CLASSNAME, SHOW_DETAILS_CLASSNAME } from '../../constants';
import messages from '../../messages';

export type SessionMapShowDetailsSwitchProps = {
  nodeId: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
};

const Component = ({
  nodeId,
  checked,
  onToggle,
}: SessionMapShowDetailsSwitchProps) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Divider my={16} className={DIVIDER_CLASSNAME} />
      <Row className={SHOW_DETAILS_CLASSNAME}>
        <div onClick={(e) => e.stopPropagation()}>
          <Switch
            checked={checked}
            onToggle={onToggle}
            id={`show-details-switch-${nodeId}`}
            labelPosition={LabelPosition.Right}
          >
            <Text
              ml={5}
              fontSize={12}
              fontWeight="bold"
              color={themeColors.comment}
            >
              {formatMessage(messages.showDetails)}
            </Text>
          </Switch>
        </div>
      </Row>
    </>
  );
};

export const SessionMapShowDetailsSwitch = memo(Component);
