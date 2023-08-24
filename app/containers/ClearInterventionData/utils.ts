import * as Yup from 'yup';
import { nonNegativeIntegerValidationSchema } from 'utils/validators';

export const createClearConversationDataFormValidationSchema = () =>
  Yup.object().shape({
    delay: nonNegativeIntegerValidationSchema,
  });
