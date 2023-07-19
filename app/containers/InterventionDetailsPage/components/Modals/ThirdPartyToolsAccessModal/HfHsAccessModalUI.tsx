import React, { memo } from 'react';
import { Markup } from 'interweave';
import { useIntl } from 'react-intl';

import globalMessages from 'global/i18n/globalMessages';

import Switch, { LabelPosition } from 'components/Switch';
import Text from 'components/Text';
import Button from 'components/Button';
import FlexRow from 'components/Row';
import FlexCol from 'components/Column';
import { Col, Row } from 'components/ReactGridSystem';
import ApiSelect from 'components/Select/ApiSelect';

import { HFHS_ACCESS_LABEL_ID } from './constants';
import { ModalUIData } from './types';

import messages from './messages';
import {
  clinicLocationsDataParser,
  clinicLocationsOptionsFormatter,
} from './utils';
import { SectionHeader } from './styled';

interface Props {
  modalData: ModalUIData;
  canSave: boolean;
  isSaving: boolean;
  onAccessChange: (hfhsAccess: boolean) => void;
  onLocationIdsChange: (locationIds: string[]) => void;
  onSave: () => void;
}

const Component = ({
  modalData,
  canSave,
  isSaving,
  onAccessChange,
  onLocationIdsChange,
  onSave,
}: Props) => {
  const { formatMessage } = useIntl();

  const { hfhsAccess, locationIds } = modalData;

  const handleAccessChange = () => onAccessChange(!hfhsAccess);

  const clinicLocationsError = hfhsAccess && !locationIds.length;

  return (
    <FlexCol minHeight={537}>
      <FlexRow flex={1} align="start" direction="column">
        <FlexRow align="center">
          <Text mr={8} fontSize="15px">
            {formatMessage(messages.hfhsRevokeAccess)}
          </Text>
          <Switch
            id={HFHS_ACCESS_LABEL_ID}
            onToggle={handleAccessChange}
            labelPosition={LabelPosition.Right}
            checked={hfhsAccess}
          >
            <Text fontSize="15px" fontWeight={hfhsAccess ? 'bold' : 'normal'}>
              {formatMessage(messages.hfhsGiveAccess)}
            </Text>
          </Switch>
        </FlexRow>
        {hfhsAccess && (
          <>
            <FlexRow>
              <SectionHeader mt={40} mb={24}>
                {formatMessage(messages.clinicLocations)}
              </SectionHeader>
            </FlexRow>
            <FlexRow width="100%">
              <ApiSelect
                url="/v1/henry_ford/clinic_locations"
                dataParser={clinicLocationsDataParser}
                optionsFormatter={clinicLocationsOptionsFormatter}
                defaultFetchErrorMessage={messages.fetchClinicLocationsError}
                width="100%"
                selectedValue={locationIds}
                onSelectedValueChange={onLocationIdsChange}
                selectProps={{
                  placeholder: formatMessage(
                    messages.clinicLocationsPlaceholder,
                  ),
                  isMulti: true,
                  hasError: clinicLocationsError,
                }}
              />
            </FlexRow>
            {clinicLocationsError &&
              formatMessage(messages.selectClinicLocationsError)}
          </>
        )}
        <FlexRow mt={56}>
          <Markup
            content={formatMessage(messages.hfhsAccessNote)}
            attributes={{
              fontStyle: 'italic',
              lineHeight: '23px',
            }}
            tagName={Text}
          />
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
            {formatMessage(globalMessages.save)}
          </Button>
        </Col>
      </Row>
    </FlexCol>
  );
};

export const HfHsAccessModalUI = memo(Component);
