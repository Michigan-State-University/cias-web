import { getCountries } from 'libphonenumber-js';

const hiddenCountries = ['AC', 'MF', 'SH', 'EH', 'BQ', 'TA'];

export default () =>
  getCountries().filter((country) => !hiddenCountries.includes(country));
