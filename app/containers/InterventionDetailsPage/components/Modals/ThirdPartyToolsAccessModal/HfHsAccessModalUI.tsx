import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import Switch, { LabelPosition } from 'components/Switch';
import Text from 'components/Text';
import Button from 'components/Button';
import FlexRow from 'components/Row';
import FlexCol from 'components/Column';
import { Col, Row } from 'components/ReactGridSystem';

import { HFHS_ACCESS_LABEL_ID } from './constants';
import { ModalUIData } from './types';

import messages from '../messages';

interface Props {
  modalData: ModalUIData;
  canSave: boolean;
  isSaving: boolean;
  onAccessChange: (hfhsAccess: boolean) => void;
  onSave: () => void;
}

const Component = ({
  modalData,
  canSave,
  isSaving,
  onAccessChange,
  onSave,
}: Props) => {
  const { formatMessage } = useIntl();

  const { hfhsAccess } = modalData;

  const handleAccessChange = () => onAccessChange(!hfhsAccess);

  return (
    <FlexCol minHeight={537}>
      <FlexRow flex={1} align="start">
        <FlexRow align="center">
          <Text mr={8}>{formatMessage(messages.hfhsRevokeAccess)}</Text>
          <Switch
            id={HFHS_ACCESS_LABEL_ID}
            onToggle={handleAccessChange}
            labelPosition={LabelPosition.Right}
            checked={hfhsAccess}
          >
            <Text fontWeight={hfhsAccess ? 'bold' : 'normal'}>
              {formatMessage(messages.hfhsGiveAccess)}
            </Text>
          </Switch>
        </FlexRow>
      </FlexRow>
      <Row align="end">
        <Col xs={4}>
          <Button
            onClick={onSave}
            loading={isSaving}
            disabled={!canSave}
            mt={40}
          >
            {formatMessage(messages.saveButton)}
          </Button>
        </Col>
      </Row>
    </FlexCol>
  );
};

export const HfHsAccessModalUI = memo(Component);
