export type InvitationListItemState = {
  resendLoading: false;
};

export enum InterventionInvitationTargetType {
  SESSION = 'session',
  INTERVENTION = 'intervention',
}

export type SendInvitationsPayloadItem = {
  emails: string[];
  healthClinicId?: string;
  targetId: string;
  targetType: InterventionInvitationTargetType;
};

export type SendInvitationsPayload = SendInvitationsPayloadItem[];
