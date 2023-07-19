import React, { memo, useRef } from 'react';
import { Markup } from 'interweave';
import { useIntl } from 'react-intl';

import globalMessages from 'global/i18n/globalMessages';

import useDidUpdateEffect from 'utils/useDidUpdateEffect';

import { LabelPosition } from 'components/Switch';
import Text from 'components/Text';
import Button from 'components/Button';
import FlexRow from 'components/Row';
import FlexCol from 'components/Column';
import { Col, Row } from 'components/ReactGridSystem';
import { FormikApiSelect } from 'components/FormikApiSelect';
import FormikSwitchInput from 'components/FormikSwitchInput';

import { ThirdPartyToolsAccessFormValues } from './types';

import messages from './messages';
import {
  clinicLocationsDataParser,
  clinicLocationsOptionsFormatter,
} from './utils';

interface Props {
  values: ThirdPartyToolsAccessFormValues;
  canSave: boolean;
  isSaving: boolean;
  onSave: () => void;
}

const Component = ({ values, canSave, isSaving, onSave }: Props) => {
  const { formatMessage } = useIntl();

  const { hfhsAccess } = values;

  const selectRef = useRef<HTMLSelectElement>(null);

  useDidUpdateEffect(() => {
    if (hfhsAccess && selectRef.current) {
      selectRef.current.focus();
    }
  }, [hfhsAccess]);

  return (
    <FlexCol minHeight={537}>
      <FlexRow flex={1} align="start" direction="column">
        <FlexRow align="center" width="100%">
          <Text mr={8} fontSize="15px">
            {formatMessage(messages.hfhsRevokeAccess)}
          </Text>
          <FormikSwitchInput
            formikKey="hfhsAccess"
            labelPosition={LabelPosition.Right}
            columnStyleProps={{
              width: 'auto',
            }}
          >
            <Text fontSize="15px" fontWeight={hfhsAccess ? 'bold' : 'normal'}>
              {formatMessage(messages.hfhsGiveAccess)}
            </Text>
          </FormikSwitchInput>
        </FlexRow>
        {hfhsAccess && (
          <>
            <FlexRow width="100%" mt={40}>
              <FormikApiSelect
                formikKey="locationIds"
                label={formatMessage(messages.clinicLocations)}
                url="/v1/henry_ford/clinic_locations"
                dataParser={clinicLocationsDataParser}
                optionsFormatter={clinicLocationsOptionsFormatter}
                defaultFetchErrorMessage={messages.fetchClinicLocationsError}
                width="100%"
                selectProps={{
                  placeholder: formatMessage(
                    messages.clinicLocationsPlaceholder,
                  ),
                  isMulti: true,
                }}
                ref={selectRef}
              />
            </FlexRow>
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
            type="submit"
          >
            {formatMessage(globalMessages.save)}
          </Button>
        </Col>
      </Row>
    </FlexCol>
  );
};

export const HfHsAccessModalUI = memo(Component);
