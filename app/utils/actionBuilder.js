import isNullOrUndefined from 'utils/isNullOrUndefined';

const actionBuilder = (type, payload, fields = null) => ({
  type,
  payload,
  ...(!isNullOrUndefined(fields) && { fields }),
});

export { actionBuilder };
