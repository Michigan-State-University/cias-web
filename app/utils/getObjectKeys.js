import keys from 'lodash/keys';

export const getObjectKeys = obj => keys(obj);

export const getObjectKeysWithoutIds = obj =>
  getObjectKeys(obj).filter(
    key => !key.endsWith('_id') && !key.endsWith('Id') && key !== 'id',
  );
