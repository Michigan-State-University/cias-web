type CollaboratorUser = {
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  fullName: string;
  id: string;
  email: string;
};

export type CollaboratorData = {
  id: string;
  view: boolean;
  edit: boolean;
  dataAccess: boolean;
};

export type Collaborator = CollaboratorData & {
  user: CollaboratorUser;
};
