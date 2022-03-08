import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { Formik, FormikHelpers, FormikState } from 'formik';
import * as Yup from 'yup';

import FormikInput from 'components/FormikInput';
import { SubstanceGroup } from 'models/Question';
import { EditModal } from 'components/Modal/EditModal';

import messages from './messages';

type NewSubstanceGroupFormikType = {
  name: string;
};

type NewSubstanceGroupModalType = {
  substanceGroup?: SubstanceGroup;
  error?: string;
  loading?: boolean;
  visible: boolean;
  editMode?: boolean;
  onClose: () => void;
  onSubmitForm: (name: string) => void;
};

const schema = (formatMessage: any) => ({
  name: Yup.string().required(formatMessage(messages.nameRequired)),
});

const validationSchema = (formatMessage: any) =>
  Yup.object().shape(schema(formatMessage));

const initialValues = (substanceGroup?: SubstanceGroup) => ({
  name: substanceGroup?.name ?? '',
});

const NewSubstanceGroupModal = ({
  substanceGroup,
  error,
  loading,
  visible,
  onClose,
  onSubmitForm,
  editMode = false,
}: NewSubstanceGroupModalType) => {
  const { formatMessage } = useIntl();
  const previousLoadingState = useRef(loading);
  const [modalVisible, setModalVisible] = useState(visible);
  const closeModal = () => setModalVisible(false);

  const inputProps = {
    height: 46,
    width: '100%',
  };

  const handleClose =
    (
      resetForm?: (
        nextState?: Partial<FormikState<NewSubstanceGroupFormikType>>,
      ) => void,
    ) =>
    () => {
      closeModal();
      if (resetForm) {
        resetForm();
      }
      onClose();
    };

  const onSubmit = (
    values: NewSubstanceGroupFormikType,
    { setSubmitting, resetForm }: FormikHelpers<NewSubstanceGroupFormikType>,
  ) => {
    onSubmitForm(values.name);
    setSubmitting(false);
    handleClose(resetForm)();
  };

  useEffect(() => {
    if (previousLoadingState.current && !loading && !error) handleClose();
    previousLoadingState.current = loading;
  }, [loading]);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  return (
    <>
      <Formik
        validationSchema={validationSchema(formatMessage)}
        initialValues={initialValues(substanceGroup)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleSubmit, resetForm, isValid }) => (
          <>
            <EditModal
              visible={modalVisible}
              title={formatMessage(
                messages[editMode ? 'editSubstanceGroup' : 'addSubstanceGroup'],
              )}
              description={formatMessage(messages.addSubstanceGroupDescription)}
              onClose={handleClose(resetForm)}
              confirmButtonMessage={formatMessage(
                messages[editMode ? 'saveChanges' : 'addGroup'],
              )}
              onSubmit={handleSubmit}
              disabled={!isValid}
              loading={loading}
              width={440}
            >
              <FormikInput
                data-testid="substance-group-name"
                formikKey="name"
                placeholder={formatMessage(
                  messages.substanceGroupNamePlaceholder,
                )}
                label={formatMessage(messages.substanceGroupName)}
                type="text"
                inputProps={inputProps}
                mr={16}
              />
            </EditModal>
          </>
        )}
      </Formik>
    </>
  );
};

export default NewSubstanceGroupModal;
