import { User } from 'models/User';

export enum UserItemState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
}

export type UserWithState = User & { state?: UserItemState };
