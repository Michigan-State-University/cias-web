const lastKey = obj =>
  obj ? Object.keys(obj)[Object.keys(obj).length - 1] : null;

export default lastKey;
