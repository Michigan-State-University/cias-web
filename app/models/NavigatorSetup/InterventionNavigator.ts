import { SimpleUser } from 'models/User';

export type NavigatorModalUser = SimpleUser & {
  inDeletion?: boolean;
};
