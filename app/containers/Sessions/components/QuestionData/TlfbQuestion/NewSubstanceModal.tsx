import React, { useState, useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik, FormikHelpers, FormikState } from 'formik';
import * as Yup from 'yup';

import Button from 'components/Button';
import Column from 'components/Column';
import FormikInput from 'components/FormikInput';
import Box from 'components/Box';
import Modal from 'components/Modal';
import ErrorAlert from 'components/ErrorAlert';
import Row from 'components/Row';
import { Substance } from 'models/Question';

import Divider from 'components/Divider';
import messages from './messages';

type NewSubstanceModalType = {
  substance?: Substance;
  error?: string;
  loading: boolean;
  visible: boolean;
  editMode?: boolean;
  onClose: () => void;
  onSubmitForm: (substance: Substance) => void;
};

const validationSchema = (formatMessage: any) =>
  Yup.object().shape({
    name: Yup.string().required(formatMessage(messages.nameRequired)),
    variable: Yup.string().required(formatMessage(messages.variableRequired)),
  });

const initialValues = (substance?: Substance): Substance => ({
  name: substance?.name ?? '',
  variable: substance?.variable ?? '',
});

const NewSubstanceModal = ({
  substance,
  error,
  loading,
  visible,
  onClose,
  onSubmitForm,
  editMode = false,
}: NewSubstanceModalType) => {
  const { formatMessage } = useIntl();
  const previousLoadingState = useRef(loading);
  const [modalVisible, setModalVisible] = useState(visible);
  const closeModal = () => setModalVisible(false);

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
    { setSubmitting, resetForm }: FormikHelpers<Substance>,
  ) => {
    onSubmitForm(values);
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
        initialValues={initialValues(substance)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleSubmit, resetForm, isValid }) => {
          const inputProps = {
            height: 46,
            width: '100%',
          };
          return (
            <>
              <Modal
                visible={modalVisible}
                title={formatMessage(
                  messages[editMode ? 'editSubstance' : 'addNewSubstance'],
                )}
                onClose={handleClose(resetForm)}
                width={500}
                maxWidth="100%"
                titleProps={{
                  fontSize: 20,
                  mb: 5,
                }}
                px={32}
                py={32}
              >
                <Column>
                  <Box mb={40}>
                    <FormattedMessage
                      {...messages.addNewSubstanceDescription}
                    />
                    <Divider mt={16} />
                  </Box>
                  <Row width="100%">
                    <FormikInput
                      data-testid="substance-name"
                      formikKey="name"
                      placeholder={formatMessage(
                        messages.substanceNamePlaceholder,
                      )}
                      label={formatMessage(messages.substanceName)}
                      type="text"
                      inputProps={inputProps}
                      mr={16}
                    />
                    <FormikInput
                      data-testid="substance-variable"
                      formikKey="variable"
                      placeholder={formatMessage(
                        messages.substanceVariablePlaceholder,
                      )}
                      label={formatMessage(messages.substanceVariable)}
                      type="text"
                      inputProps={inputProps}
                    />
                  </Row>
                  <Row width="100%" mt={56}>
                    <Button
                      hoverable
                      onClick={handleSubmit}
                      type="button"
                      loading={loading}
                      data-testid="confirm-button"
                      width={156}
                      mr={16}
                      disabled={!isValid}
                    >
                      <FormattedMessage
                        {...messages[editMode ? 'saveChanges' : 'addSubstance']}
                      />
                    </Button>
                    <Button
                      data-testid="close-button"
                      mr={20}
                      light
                      hoverable
                      onClick={handleClose(resetForm)}
                      type="button"
                      width={104}
                    >
                      <FormattedMessage {...messages.cancel} />
                    </Button>
                  </Row>
                  {error && <ErrorAlert mt={25} errorText={error} />}
                </Column>
              </Modal>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default NewSubstanceModal;
