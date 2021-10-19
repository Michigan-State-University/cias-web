import React, { ChangeEvent, memo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import EditIcon from 'assets/svg/edit.svg';

import { themeColors } from 'theme';
import { numericValidator } from 'utils/validators';
import { CatMhLicenseType } from 'models/Intervention';

import { Col, FullWidthContainer, Row } from 'components/ReactGridSystem';
import Divider from 'components/Divider';
import Text from 'components/Text';
import StyledInput from 'components/Input/StyledInput';
import Input from 'components/Input';
import Radio from 'components/Radio';
import FlexRow from 'components/Row';
import Switch, { LabelPosition } from 'components/Switch';
import Button, { ImageButton } from 'components/Button';

import messages from '../messages';
import { SectionHeader } from './styled';
import {
  ACCESS_LABEL_ID,
  APPLICATION_INPUT_LABEL_ID,
  LICENSE_LIMITED_LABEL_ID,
  LICENSE_UNLIMITED_LABEL_ID,
  ORGANIZATION_INPUT_LABEL_ID,
  TEST_NUMBER_LABEL_ID,
} from './constants';
import { ModalUIData } from './types';

type Props = {
  onAccessChange: (allow: boolean) => void;
  onLicenseInformationChange: (
    organizationId: string,
    applicationId: string,
  ) => void;
  onLicenseTypeChange: (type: CatMhLicenseType) => void;
  onTestNumberChange: (count: number) => void;
  onSave: () => void;
  canSave: boolean;
  isSaving: boolean;
  canEdit: boolean;
  modalData: ModalUIData;
};

const Component = ({
  onAccessChange,
  onLicenseInformationChange,
  onLicenseTypeChange,
  onTestNumberChange,
  onSave,
  canSave,
  isSaving,
  canEdit,
  modalData,
}: Props) => {
  const { formatMessage } = useIntl();

  const {
    applicationId,
    organizationId,
    isAccessRevoked,
    licenseType,
    testNumber,
    currentTestNumber,
  } = modalData;

  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const toggleInput = () => setIsInputDisabled(!isInputDisabled);

  const onOrganizationIdUpdate = (event: ChangeEvent<HTMLInputElement>) =>
    onLicenseInformationChange(event.target.value, applicationId);

  const onApplicationIdUpdate = (event: ChangeEvent<HTMLInputElement>) =>
    onLicenseInformationChange(organizationId, event.target.value);

  const onLimitedLicenseChange = () =>
    onLicenseTypeChange(CatMhLicenseType.LIMITED);

  const onUnlimitedLicenseChange = () =>
    onLicenseTypeChange(CatMhLicenseType.UNLIMITED);

  const handleTestNumberChange = (value: string) =>
    onTestNumberChange(Number.parseInt(value, 10));

  const handleAccessChange = () => onAccessChange(!isAccessRevoked);

  return (
    <FullWidthContainer>
      <Row>
        <Col>
          {formatMessage(messages.modalHeader)}
          <Divider mt={16} mb={32} />
        </Col>
      </Row>

      <Row>
        <Col>
          <FlexRow align="center">
            <Text mr={8}>{formatMessage(messages.revokeAccess)}</Text>
            <Switch
              id={ACCESS_LABEL_ID}
              onToggle={handleAccessChange}
              labelPosition={LabelPosition.Right}
              checked={!isAccessRevoked}
              disabled={!canEdit}
            >
              <Text>{formatMessage(messages.giveAccess)}</Text>
            </Switch>
          </FlexRow>
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionHeader mt={40} mb={24}>
            {formatMessage(messages.licenseDataHeader)}
          </SectionHeader>
        </Col>
      </Row>

      <Row>
        <Col>
          <Text id={ORGANIZATION_INPUT_LABEL_ID} mb={12}>
            {formatMessage(messages.organizationIdLabel)}
          </Text>
          <Input
            value={organizationId}
            onChange={onOrganizationIdUpdate}
            aria-labelledby={ORGANIZATION_INPUT_LABEL_ID}
            placeholder={formatMessage(messages.numberPlaceholder)}
            disabled={!canEdit}
          />
        </Col>

        <Col>
          <Text id={APPLICATION_INPUT_LABEL_ID} mb={12}>
            {formatMessage(messages.applicationIdLabel)}
          </Text>
          <Input
            value={applicationId}
            onChange={onApplicationIdUpdate}
            aria-labelledby={APPLICATION_INPUT_LABEL_ID}
            placeholder={formatMessage(messages.numberPlaceholder)}
            disabled={!canEdit}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <SectionHeader mt={40} mb={24}>
            {formatMessage(messages.licenseTypeHeader)}
          </SectionHeader>
        </Col>
      </Row>

      <Row>
        <Col>
          <Radio
            id={LICENSE_LIMITED_LABEL_ID}
            onChange={onLimitedLicenseChange}
            checked={licenseType === CatMhLicenseType.LIMITED}
            disabled={!canEdit}
          >
            <Text>{formatMessage(messages.limitedTypeLabel)}</Text>
          </Radio>
        </Col>

        <Col>
          <Radio
            id={LICENSE_UNLIMITED_LABEL_ID}
            onChange={onUnlimitedLicenseChange}
            checked={licenseType === CatMhLicenseType.UNLIMITED}
            disabled={!canEdit}
          >
            <Text>{formatMessage(messages.unlimitedTypeLabel)}</Text>
          </Radio>
        </Col>
      </Row>

      {licenseType === CatMhLicenseType.LIMITED && (
        <>
          <Row>
            <Col>
              <SectionHeader mt={40} mb={24}>
                {formatMessage(messages.testNumberHeader)}
              </SectionHeader>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text id={TEST_NUMBER_LABEL_ID} mb={12}>
                {formatMessage(messages.testNumberLabel)}
              </Text>
            </Col>
          </Row>
          <Row align="center">
            <Col>
              <FlexRow align="center">
                <StyledInput
                  transparent={false}
                  validator={numericValidator}
                  value={`${testNumber ?? 0}`}
                  onBlur={handleTestNumberChange}
                  disabled={isInputDisabled || !canEdit}
                  aria-labelledby={TEST_NUMBER_LABEL_ID}
                  placeholder={formatMessage(messages.numberPlaceholder)}
                />
                <ImageButton
                  onClick={toggleInput}
                  title={formatMessage(messages.testNumberLabel)}
                  src={EditIcon}
                  ml={14}
                />
              </FlexRow>
            </Col>

            <Col align="end">
              <Markup
                noWrap
                content={formatMessage(messages.testNumberLeft, {
                  testNumber: (chunks) =>
                    `<span style="color: ${themeColors.primary};">${chunks}</span>`,
                  current: currentTestNumber,
                  initial: testNumber,
                })}
              />
            </Col>
          </Row>
        </>
      )}

      <Row align="center">
        <Col xs={4}>
          {/* @ts-ignore */}
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
    </FullWidthContainer>
  );
};

export const CatMhAccessModalUI = memo(Component);
