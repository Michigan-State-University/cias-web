export const getFileNameFromUrl = (url) => decodeURI(url).split('/').pop();
