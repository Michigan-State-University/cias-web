import { createContext } from 'react';

import { Roles } from './UserRoles';

export default createContext<{ userRoles: Roles[] }>({ userRoles: [] });
