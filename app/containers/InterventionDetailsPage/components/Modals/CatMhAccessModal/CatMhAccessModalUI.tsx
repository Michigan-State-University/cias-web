import React, { ChangeEvent, memo, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useFormik } from 'formik';

import EditIcon from 'assets/svg/edit.svg';

import { CatMhLicenseType } from 'models/Intervention';

import { Col, FullWidthContainer, Row } from 'components/ReactGridSystem';
import Divider from 'components/Divider';
import Text from 'components/Text';
import Radio from 'components/Radio';
import FlexRow from 'components/Row';
import Switch, { LabelPosition } from 'components/Switch';
import Button, { ImageButton } from 'components/Button';
import { FormikHookInput } from 'components/FormikInput';

import messages from '../messages';
import { SectionHeader } from './styled';
import {
  ACCESS_LABEL_ID,
  LICENSE_LIMITED_LABEL_ID,
  LICENSE_UNLIMITED_LABEL_ID,
  TEST_NUMBER_LABEL_ID,
  modalValidationSchema,
  APPLICATION_ID_FORMIK_KEY,
  ORGANIZATION_ID_FORMIK_KEY,
  TEST_NUMBER_FORMIK_KEY,
} from './constants';
import { ModalUIData } from './types';

type Props = {
  onAccessChange: (allow: boolean) => void;
  onLicenseInformationChange: (
    organizationId: number,
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

  const initialFormikValues = useMemo(
    () => ({
      [APPLICATION_ID_FORMIK_KEY]: applicationId,
      [ORGANIZATION_ID_FORMIK_KEY]: `${organizationId ?? ''}`,
      [TEST_NUMBER_FORMIK_KEY]: `${testNumber ?? 0}`,
    }),
    [],
  );

  const formik = useFormik({
    initialValues: initialFormikValues,
    validationSchema: modalValidationSchema,
    validateOnMount: true,
    onSubmit: () => {},
  });

  const { isValid } = formik;

  const areFieldsDisabled = !canEdit || isAccessRevoked;
  const isButtonDisabled = !canEdit || !canSave || !isValid;

  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const toggleInput = () => setIsInputDisabled(!isInputDisabled);

  const onOrganizationIdUpdate = (event: ChangeEvent<HTMLInputElement>) =>
    onLicenseInformationChange(
      Number.parseInt(event.target.value, 10),
      applicationId,
    );

  const onApplicationIdUpdate = (event: ChangeEvent<HTMLInputElement>) =>
    onLicenseInformationChange(organizationId, event.target.value);

  const onLimitedLicenseChange = () =>
    onLicenseTypeChange(CatMhLicenseType.LIMITED);

  const onUnlimitedLicenseChange = () =>
    onLicenseTypeChange(CatMhLicenseType.UNLIMITED);

  const handleTestNumberChange = (event: ChangeEvent<HTMLInputElement>) =>
    onTestNumberChange(Number.parseInt(event.target.value, 10));

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
          {/* @ts-ignore */}
          <FormikHookInput
            formikKey={ORGANIZATION_ID_FORMIK_KEY}
            formikState={formik}
            placeholder={formatMessage(messages.numberPlaceholder)}
            label={formatMessage(messages.organizationIdLabel)}
            onChange={onOrganizationIdUpdate}
            inputProps={{ disabled: areFieldsDisabled }}
          />
        </Col>

        <Col>
          {/* @ts-ignore */}
          <FormikHookInput
            formikKey={APPLICATION_ID_FORMIK_KEY}
            formikState={formik}
            placeholder={formatMessage(messages.numberPlaceholder)}
            label={formatMessage(messages.applicationIdLabel)}
            onChange={onApplicationIdUpdate}
            inputProps={{ disabled: areFieldsDisabled }}
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
            disabled={areFieldsDisabled}
          >
            <Text>{formatMessage(messages.limitedTypeLabel)}</Text>
          </Radio>
        </Col>

        <Col>
          <Radio
            id={LICENSE_UNLIMITED_LABEL_ID}
            onChange={onUnlimitedLicenseChange}
            checked={licenseType === CatMhLicenseType.UNLIMITED}
            disabled={areFieldsDisabled}
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
          <Row>
            <Col>
              <FlexRow height="50px">
                {/* @ts-ignore */}
                <FormikHookInput
                  formikKey={TEST_NUMBER_FORMIK_KEY}
                  formikState={formik}
                  placeholder={formatMessage(messages.numberPlaceholder)}
                  onChange={handleTestNumberChange}
                  inputProps={{
                    disabled: isInputDisabled || areFieldsDisabled,
                    'aria-labelledby': TEST_NUMBER_LABEL_ID,
                  }}
                />
                <ImageButton
                  height="50px"
                  onClick={toggleInput}
                  title={formatMessage(messages.testNumberLabel)}
                  disabled={areFieldsDisabled}
                  src={EditIcon}
                  ml={14}
                />
              </FlexRow>
            </Col>

            <Col align="end">
              {formatMessage(messages.testNumberLeft, {
                current: currentTestNumber,
                initial: testNumber,
              })}
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
            disabled={isButtonDisabled}
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
