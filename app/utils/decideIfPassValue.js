const decideIfPassValue = ({ index, arrayLength, value, omit = 'end' }) => {
  const indexToOmit = omit === 'end' ? arrayLength - 1 : 0;
  return index !== indexToOmit ? value : null;
};

export default decideIfPassValue;
