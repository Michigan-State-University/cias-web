const blurDocument = () => {
  if ('activeElement' in document) document.activeElement.blur();
};
export default blurDocument;
