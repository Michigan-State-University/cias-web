import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { FileUploadQuestionDTO } from 'models/Question';

import { makeSelectSelectedQuestion } from 'global/reducers/questions';

import { useParticipantUploadConfig } from 'utils/useParticipantUploadConfig';

import Column from 'components/Column';

import FileUploadQuestionLayout from 'containers/AnswerSessionPage/layouts/FileUploadQuestionLayout';

import { CommonQuestionProps } from '../types';

const noop = () => {};

const FileUploadQuestion: FC<CommonQuestionProps> = () => {
  const selectedQuestion: FileUploadQuestionDTO = useSelector(
    makeSelectSelectedQuestion(),
  );

  const config = useParticipantUploadConfig();

  return (
    <Column mt={10}>
      <FileUploadQuestionLayout
        config={config}
        uploads={[]}
        showFileDescription={
          !!selectedQuestion?.settings?.show_file_description
        }
        onUpload={noop}
        onRemove={noop}
        uploading={false}
        removingId={null}
        errorCode={null}
        scanTakingLong={false}
        disabled
      />
    </Column>
  );
};

export default FileUploadQuestion;
