import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { QuestionGroup } from 'models/QuestionGroup';
import { canEdit } from 'models/Status/statusPermissions';

import { makeSelectInterventionStatus } from 'global/reducers/intervention';

import StyledInput from 'components/Input/StyledInput';
import { selectInputText } from 'components/Input/utils';

import {
  TlfbContainer,
  TlfbHeaderContainer,
  TlfbSettingsContainer,
} from './styled';
import messages from '../QuestionDetails/messages';

export type TlfbDetailsProps = {
  questionGroup: QuestionGroup;
  changeGroupName: (newName: string) => void;
};

// TODO remove
export const TlfbDetails = ({
  questionGroup,
  changeGroupName,
}: TlfbDetailsProps) => {
  const { formatMessage } = useIntl();

  const interventionStatus = useSelector(makeSelectInterventionStatus());
  const editingPossible = canEdit(interventionStatus);

  return (
    <TlfbContainer>
      <TlfbHeaderContainer>
        <StyledInput
          // @ts-ignore
          px={12}
          value={questionGroup.title}
          fontSize={18}
          fontWeight="bold"
          placeholder={formatMessage(messages.groupPlaceholder)}
          maxWidth="initial"
          onFocus={selectInputText}
          onBlur={(val) => changeGroupName(val)}
          disabled={!editingPossible}
        />
      </TlfbHeaderContainer>
      <TlfbSettingsContainer></TlfbSettingsContainer>
    </TlfbContainer>
  );
};
