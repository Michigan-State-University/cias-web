export type Interlocutor = {
  id: string;
  userId: string;
  avatarUrl?: Nullable<string>;
  firstName: string;
  lastName: string;
};

export type InterlocutorAvatarData = Pick<
  Interlocutor,
  'avatarUrl' | 'firstName' | 'lastName'
>;

export type InterlocutorNameData = Pick<
  Interlocutor,
  'userId' | 'firstName' | 'lastName'
>;
