export type SocketMessageStatus = 200;

// incoming
export type SocketMessage<Topic extends string, Data extends object> = {
  topic: Topic;
  data: Data;
  status: SocketMessageStatus;
};

// outgoing
export type SocketAction<Action extends string, Data extends object> = {
  name: Action;
  data: Data;
};
