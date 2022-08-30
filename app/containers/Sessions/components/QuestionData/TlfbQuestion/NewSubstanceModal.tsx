import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { Formik, FormikHelpers, FormikState } from 'formik';
import * as Yup from 'yup';

import FormikInput from 'components/FormikInput';
import { Substance } from 'models/Question';
import { EditModal } from 'components/Modal/EditModal';
import { variableNameValidator } from 'utils/validators';

import messages from './messages';
import { maximumLength } from './constants';

type NewSubstanceModalType = {
  substance?: Substance;
  error?: string;
  loading?: boolean;
  visible: boolean;
  editMode?: boolean;
  onClose: () => void;
  onSubmitForm: (substance: Substance) => void;
  grouped?: boolean;
};

const schema = (formatMessage: any, grouped: boolean) => ({
  name: Yup.string()
    .required(formatMessage(messages.nameRequired))
    .max(
      maximumLength,
      formatMessage(messages.maxSize, { maximumLength, type: 'Substance' }),
    ),
  variable: Yup.string().required(formatMessage(messages.variableRequired)),
  ...(grouped && {
    unit: Yup.string().required(formatMessage(messages.unitRequired)),
  }),
});

const validationSchema = (formatMessage: any, grouped: boolean) =>
  Yup.object().shape(schema(formatMessage, grouped));

const initialValues = (grouped: boolean, substance?: Substance): Substance => ({
  name: substance?.name ?? '',
  variable: substance?.variable ?? '',
  ...(grouped && { unit: substance?.unit ?? '' }),
});

const NewSubstanceModal = ({
  substance,
  error,
  loading,
  visible,
  onClose,
  onSubmitForm,
  grouped = false,
  editMode = false,
}: NewSubstanceModalType) => {
  const { formatMessage } = useIntl();
  const previousLoadingState = useRef(loading);
  const [modalVisible, setModalVisible] = useState(visible);
  const closeModal = () => setModalVisible(false);

  const inputProps = {
    height: 46,
    width: '100%',
  };

  const handleClose =
    (resetForm?: (nextState?: Partial<FormikState<Substance>>) => void) =>
    () => {
      closeModal();
      if (resetForm) {
        resetForm();
      }
      onClose();
    };

  const onSubmit = (
    values: Substance,
    { setSubmitting }: FormikHelpers<Substance>,
  ) => {
    onSubmitForm(values);
    setSubmitting(false);
  };

  useEffect(() => {
    if (previousLoadingState.current && !loading && !error) {
      handleClose()();
    }
    previousLoadingState.current = loading;
  }, [loading]);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  return (
    <>
      <Formik
        validationSchema={validationSchema(formatMessage, grouped)}
        initialValues={initialValues(grouped, substance)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleSubmit, resetForm, isValid }) => (
          <>
            <EditModal
              visible={modalVisible}
              title={formatMessage(
                messages[editMode ? 'editSubstance' : 'addNewSubstance'],
              )}
              description={formatMessage(
                messages[
                  grouped
                    ? 'addNewGroupedSubstanceDescription'
                    : 'addNewSubstanceDescription'
                ],
              )}
              onClose={handleClose(resetForm)}
              confirmButtonMessage={formatMessage(
                messages[editMode ? 'saveChanges' : 'addSubstance'],
              )}
              onSubmit={handleSubmit}
              disabled={!isValid}
              loading={loading}
              width={grouped ? 560 : 500}
            >
              <>
                <FormikInput
                  data-testid="substance-name"
                  formikKey="name"
                  placeholder={formatMessage(messages.substanceNamePlaceholder)}
                  label={formatMessage(messages.substanceName)}
                  type="text"
                  inputProps={inputProps}
                  mr={16}
                />
                {grouped && (
                  <FormikInput
                    data-testid="substance-unit"
                    formikKey="unit"
                    placeholder={formatMessage(messages.unitPlaceholder)}
                    label={formatMessage(messages.unit)}
                    type="text"
                    inputProps={inputProps}
                    mr={16}
                  />
                )}
                <FormikInput
                  data-testid="substance-variable"
                  formikKey="variable"
                  placeholder={formatMessage(
                    messages.substanceVariablePlaceholder,
                  )}
                  label={formatMessage(messages.substanceVariable)}
                  type="text"
                  inputProps={inputProps}
                  validator={variableNameValidator}
                />
              </>
            </EditModal>
          </>
        )}
      </Formik>
    </>
  );
};

export default NewSubstanceModal;
