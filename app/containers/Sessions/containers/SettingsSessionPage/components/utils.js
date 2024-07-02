export const getRandomString = (length) => {
  // Set of uppercased letters without misleading chars - 'I', 'L', 'O', '0'
  const charSet = 'ABCDEFGHJKMNPQRSTUVWXYZ123456789_';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};
