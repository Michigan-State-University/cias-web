import { Message } from '@anycable/core';

export type SocketErrorMessageData<AdditionalErrorData extends object = {}> = {
  error: string;
} & AdditionalErrorData;

export type SocketMessageStatus = 200;
export type SocketErrorMessageStatus = 422 | 404 | 400;

// incoming message
export type SocketMessage<
  Topic extends string,
  Data extends object | string | undefined = undefined,
  Status extends SocketMessageStatus = 200,
> = {
  topic: Topic;
  data: Data;
  status: Status;
};

// incoming error message
export type SocketErrorMessage<
  Topic extends string,
  Data extends SocketErrorMessageData,
  Status extends SocketErrorMessageStatus,
> = {
  topic: Topic;
  data: Data;
  status: Status;
};

// outgoing action
export type SocketAction<Action extends string, Data extends object> = {
  name: Action;
  data: Data;
};

export type SocketOptions<TConnectionParams> = {
  suspend?: boolean;
  socketConnectionParams?: TConnectionParams;
  onUnsubscribe?: () => void;
};

export type SocketMessageListener<T extends Message> = (message: T) => void;
