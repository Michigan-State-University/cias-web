import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';

import {
  importInterventionRequest,
  importInterventionSaga,
  makeSelectInterventionsLoader,
  makeSelectInterventionsError,
} from 'global/reducers/interventions';
import globalMessages from 'global/i18n/globalMessages';

import Divider from 'components/Divider';
import { Comment } from 'components/Text';
import Button from 'components/Button';
import ErrorAlert from 'components/ErrorAlert';
import Row from 'components/Row';
import FileInput from 'components/FileInput';
import messages from './messages';

type Props = {
  closeModal: () => void;
};

const ImportModalContent = ({ closeModal }: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  useInjectSaga({ key: 'importIntervention', saga: importInterventionSaga });

  const loading = useSelector(
    makeSelectInterventionsLoader('importIntervention'),
  );
  const error = useSelector(makeSelectInterventionsError('importIntervention'));

  const [files, setFiles] = useState<File[]>([]);

  const handleImport = () => {
    dispatch(importInterventionRequest(files[0], { onSuccess: closeModal }));
  };

  return (
    <>
      <Comment>{formatMessage(messages.uploadIntervention)}</Comment>
      <Divider mt={16} mb={40} />
      <FileInput
        value={files}
        onChange={setFiles}
        instruction={formatMessage(messages.uploadInterventionInstruction)}
        accept=".json"
      />
      {error && <ErrorAlert errorText={error} mt={16} />}
      <Row mt={56} gap={16}>
        <Button
          width="auto"
          px={30}
          title={formatMessage(messages.importIntervention)}
          loading={loading}
          onClick={handleImport}
          disabled={!files.length}
        />
        <Button
          light
          width="auto"
          px={30}
          title={formatMessage(globalMessages.cancel)}
          onClick={closeModal}
        />
      </Row>
    </>
  );
};

export default ImportModalContent;
