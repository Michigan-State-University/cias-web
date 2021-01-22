const getUrlProtocol = url => {
  const urlObj = new URL(url);

  return urlObj.protocol;
};

export default getUrlProtocol;
