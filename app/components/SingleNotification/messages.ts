import { defineMessages } from 'react-intl';

export const scope = 'app.components.SingleNotification';

export default defineMessages({
  newNarratorWasSetTitle: {
    id: `${scope}.newNarratorWasSetTitle`,
    defaultMessage: 'Narrator Changed!',
  },
  newNarratorWasSetContent: {
    id: `${scope}.newNarratorWasSetContent`,
    defaultMessage: `The narrator in <secondaryColorBold>{interventionName}</secondaryColorBold> has been changed properly.`,
  },
  transcriptIsReady: {
    id: `${scope}.conversationTranscriptReadyTitle`,
    defaultMessage: 'Transcript is ready',
  },
  conversationTranscriptReadyContent: {
    id: `${scope}.conversationTranscriptReadyContent`,
    defaultMessage: `Transcript of a conversation in <secondaryColorBold>{interventionName}</secondaryColorBold> is ready`,
  },
  interventionConversationsTranscriptReadyContent: {
    id: `${scope}.conversationTranscriptReadyContent`,
    defaultMessage: `Transcript of all conversations in <secondaryColorBold>{interventionName}</secondaryColorBold> is ready`,
  },
  successfullyRestoredInterventionTitle: {
    id: `${scope}.successfullyRestoredInterventionTitle`,
    defaultMessage: 'Intervention imported',
  },
  successfullyRestoredInterventionContent: {
    id: `${scope}.successfullyRestoredInterventionContent`,
    defaultMessage: `Intervention <secondaryColorBold>{interventionName}</secondaryColorBold> has been imported successfully`,
  },
  importFailedNotificationTitle: {
    id: `${scope}.importFailedNotificationTitle`,
    defaultMessage: 'Unsuccessful import',
  },
  importFailedNotificationContent: {
    id: `${scope}.importFailedNotificationContent`,
    defaultMessage: 'There was an issue with importing intervention',
  },
  newCollaboratorAddedTitle: {
    id: `${scope}.newCollaboratorAddedTitle`,
    defaultMessage: 'Invitation to collaborate',
  },
  newCollaboratorAddedContent: {
    id: `${scope}.newCollaboratorAddedContent`,
    defaultMessage: `You have been invited to collaborate on <secondaryColorBold>{interventionName}</secondaryColorBold>`,
  },
  collaboratorRemovedTitle: {
    id: `${scope}.collaboratorRemovedTitle`,
    defaultMessage: 'Removed from collaborators',
  },
  collaboratorRemovedContent: {
    id: `${scope}.collaboratorRemovedContent`,
    defaultMessage: `You have been removed from collaborators on <secondaryColorBold>{interventionName}</secondaryColorBold>`,
  },
  startEditingInterventionTitle: {
    id: `${scope}.startEditingInterventionTitle`,
    defaultMessage: `Editing started`,
  },
  startEditingInterventionContent: {
    id: `${scope}.startEditingInterventionContent`,
    defaultMessage: `{firstName} {lastName} started editing <secondaryColorBold>{interventionName}</secondaryColorBold>`,
  },
});
