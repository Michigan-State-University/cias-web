type CollaboratorUser = {
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  fullName: string;
  id: string;
  email: string;
};

export type Collaborator = {
  dataAccess: boolean;
  edit: boolean;
  view: boolean;
  user: CollaboratorUser;
  id: string;
};
