import UserReducer from './reducer';
import makeSelectUser from './selectors';
export * from './sagas';
export {
  fetchUserRequest,
  editOtherUserRequest,
  addOtherUserAvatarRequest,
  deleteOtherUserAvatarRequest,
} from './actions';
export { initialState } from './reducer';

export { UserReducer, makeSelectUser };
