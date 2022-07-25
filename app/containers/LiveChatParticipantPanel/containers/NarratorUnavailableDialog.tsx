import React from 'react';
import ChatDialog from '../components/ChatDialog';

type NarratorUnavailableDialogProps = {
  onMinimizeDialog: () => void;
};

const NarratorUnavailableDialog = ({
  onMinimizeDialog,
}: NarratorUnavailableDialogProps) => (
  <ChatDialog header={<div>In progress</div>} onMinimize={onMinimizeDialog} />
);

export default NarratorUnavailableDialog;
