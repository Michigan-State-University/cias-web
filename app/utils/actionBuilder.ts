import isNullOrUndefined from 'utils/isNullOrUndefined';

type AppAction<T = any> = {
  type: string;
  payload: T;
  fields?: Nullable<string[]>;
};

const actionBuilder = <T>(
  type: string,
  payload: T,
  fields: Nullable<string[]> = null,
): AppAction<T> => ({
  type,
  payload,
  ...(!isNullOrUndefined(fields) && { fields }),
});

export { actionBuilder };
export type { AppAction };
