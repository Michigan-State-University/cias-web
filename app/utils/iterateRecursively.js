import each from 'lodash/each';

export default function iterateRecursively(collection, param = '') {
  const returnCollection = [];
  each(collection, model => {
    const paramCollection = model[param];
    if (!paramCollection) iterateRecursively(paramCollection, param);
    else {
      returnCollection.push(...paramCollection);
    }
  });
  return returnCollection;
}
