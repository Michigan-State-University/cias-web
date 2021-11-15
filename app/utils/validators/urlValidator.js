import * as Yup from 'yup';

const urlSchema = Yup.string().url();

export const urlValidator = target => {
  try {
    // this checks if url has valid protocol
    // eslint-disable-next-line no-new
    new URL(target);

    return urlSchema.isValidSync(target);
  } catch {
    return urlSchema.isValidSync(`http://${target}`);
  }
};
