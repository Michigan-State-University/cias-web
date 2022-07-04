export const callback =
  (...functions: CallableFunction[]) =>
  () => {
    functions.forEach((func) => func());
  };
