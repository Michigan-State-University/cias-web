export enum NotificationEvent {
  NEW_CONVERSATION = 'new_conversation',
  AUTO_GENERATED_CONVERSATION = 'auto_generated_conversation',
  NEW_NARRATOR_WAS_SET = 'new_narrator_was_set',
  CONVERSATION_TRANSCRIPT_READY = 'conversation_transcript_ready',
  INTERVENTION_CONVERSATIONS_TRANSCRIPT_READY = 'intervention_conversations_transcript_ready',
  SUCCESSFULLY_RESTORED_INTERVENTION = 'successfully_restored_intervention',
  UNSUCCESSFUL_INTERVENTION_IMPORT = 'unsuccessful_intervention_import',
  NEW_COLLABORATOR_ADDED = 'new_collaborator_added',
  COLLABORATOR_REMOVED = 'collaborator_removed',
  START_EDITING_INTERVENTION = 'start_editing_intervention',
  STOP_EDITING_INTERVENTION = 'stop_editing_intervention',
  SENSITIVE_DATA_REMOVED = 'sensitive_data_removed',
}
