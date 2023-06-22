import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { colors } from 'theme';
import {
  changeCollaboratorSettingRequest,
  removeCollaboratorRequest,
} from 'global/reducers/intervention';
import { Collaborator } from 'models/Collaborator';

import Checkbox from 'components/Checkbox';
import { StripedTR } from 'components/Table';
import Icon from 'components/Icon';
import Text, { EllipsisText } from 'components/Text';
import Button, { ImageButton } from 'components/Button';
import Box from 'components/Box';

import RedBin from 'assets/svg/bin-red-no-bg.svg';
import WhiteBin from 'assets/svg/bin-white.svg';
import CrossIcon from 'assets/svg/cross.svg';
import warningCircle from 'assets/svg/warning-circle.svg';

import Tooltip from 'components/Tooltip';
import messages from './messages';
import { StyledTD } from './styled';

type Props = {
  collaborator: Collaborator;
  index: number;
  interventionId: string;
};

const SingleCollaboratorRow = ({
  collaborator: {
    edit,
    view,
    dataAccess,
    id,
    user: { fullName, email },
  },
  index,
  interventionId,
}: Props) => {
  const [preparingToDelete, setPreparingToDelete] = useState(false);
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const changeSetting = (setting: string, value: boolean) =>
    dispatch(
      changeCollaboratorSettingRequest(
        setting,
        value,
        id,
        index,
        interventionId,
      ),
    );

  const removeCollaborator = () =>
    dispatch(removeCollaboratorRequest(id, index, interventionId));

  const trimmedFullName = fullName.trim();
  const showWarning = !trimmedFullName;

  return (
    <StripedTR
      height={53}
      stripesPlacement="odd"
      color={colors.aliceBlueSaturated}
      bg={colors.white}
      mb={4}
    >
      <StyledTD padding={8} maxWidth={0}>
        <Box display="flex" align="center">
          <Tooltip
            id={`${id}-pending`}
            mr={8}
            icon={showWarning ? warningCircle : null}
            content={formatMessage(messages.tooltipDescription)}
            visible={showWarning}
          ></Tooltip>
          <EllipsisText text={trimmedFullName || email} />
        </Box>
      </StyledTD>
      {!preparingToDelete && (
        <>
          <StyledTD padding={8}>
            <Checkbox
              checked={view}
              disabled
              id={`${id}-view-checkbox`}
              onChange={() => changeSetting('view', !view)}
            />
          </StyledTD>
          <StyledTD padding={8}>
            <Checkbox
              checked={edit}
              id={`${id}-edit-checkbox`}
              onChange={() => changeSetting('edit', !edit)}
            />
          </StyledTD>
          <StyledTD padding={8}>
            <Checkbox
              checked={dataAccess}
              id={`${id}-data-access-checkbox`}
              onChange={() => changeSetting('dataAccess', !dataAccess)}
            />
          </StyledTD>
          <StyledTD pr={8}>
            <Text textAlign="right">
              <ImageButton
                src={RedBin}
                onClick={() => setPreparingToDelete(true)}
                title={formatMessage(messages.removeAccess)}
              />
            </Text>
          </StyledTD>
        </>
      )}
      {preparingToDelete && (
        <StyledTD colSpan="4">
          <Box px={8} display="flex" align="center" justify="between">
            <div>{formatMessage(messages.areYouSure)}</div>
            <Box display="flex" align="center">
              <Button
                display="flex"
                align="center"
                color="warning"
                mr={16}
                width="auto"
                borderRadius={4}
                onClick={removeCollaborator}
              >
                <Icon src={WhiteBin} mr={8} mb={4} />
                {formatMessage(messages.removeAccess)}
              </Button>
              <ImageButton
                src={CrossIcon}
                title={formatMessage(messages.doNotRemoveAccess)}
                onClick={() => setPreparingToDelete(false)}
              />
            </Box>
          </Box>
        </StyledTD>
      )}
    </StripedTR>
  );
};

export default SingleCollaboratorRow;
