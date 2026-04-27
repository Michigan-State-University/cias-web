import { defineMessages, MessageDescriptor } from 'react-intl';

const scope =
  'app.containers.InterventionDetailsPage.containers.InviteParticipantsButton.bulkCreateErrors';

const messages = defineMessages({
  duplicate_in_csv: {
    id: `${scope}.duplicate_in_csv`,
    defaultMessage: 'Row {row}: {field} is duplicated within the CSV.',
  },
  taken: {
    id: `${scope}.taken`,
    defaultMessage: 'Row {row}: {field} is already taken.',
  },
  blank: {
    id: `${scope}.blank`,
    defaultMessage: 'Row {row}: {field} is required.',
  },
  invalid: {
    id: `${scope}.invalid`,
    defaultMessage: 'Row {row}: {field} is invalid.',
  },
  invalid_uuid: {
    id: `${scope}.invalid_uuid`,
    defaultMessage: 'Row {row}: {field} is not a valid identifier.',
  },
  not_found: {
    id: `${scope}.not_found`,
    defaultMessage: 'Row {row}: {field} does not exist.',
  },
  ra_session_missing: {
    id: `${scope}.ra_session_missing`,
    defaultMessage:
      'This intervention has no RA session — CSV answer columns are not supported.',
  },
  ra_session_has_no_answerable_questions: {
    id: `${scope}.ra_session_has_no_answerable_questions`,
    defaultMessage: 'The RA session has no answerable questions.',
  },
  session_variable_mismatch: {
    id: `${scope}.session_variable_mismatch`,
    defaultMessage:
      'Row {row}: column "{field}" does not match the RA session variable.',
  },
  unknown_question_variable: {
    id: `${scope}.unknown_question_variable`,
    defaultMessage:
      'Row {row}: column "{field}" does not match any RA question.',
  },
  unsupported_question_type: {
    id: `${scope}.unsupported_question_type`,
    defaultMessage:
      'Row {row}: column "{field}" — question type is not supported for CSV import.',
  },
  value_blank: {
    id: `${scope}.value_blank`,
    defaultMessage: 'Row {row}: column "{field}" cannot be blank.',
  },
  value_not_in_options: {
    id: `${scope}.value_not_in_options`,
    defaultMessage:
      'Row {row}: column "{field}" — value is not one of the allowed options.',
  },
  value_not_a_single: {
    id: `${scope}.value_not_a_single`,
    defaultMessage:
      'Row {row}: column "{field}" — expected a valid answer option.',
  },
  value_not_a_number: {
    id: `${scope}.value_not_a_number`,
    defaultMessage: 'Row {row}: column "{field}" — expected a number.',
  },
  value_not_a_date: {
    id: `${scope}.value_not_a_date`,
    defaultMessage:
      'Row {row}: column "{field}" — expected a date (YYYY-MM-DD).',
  },
  unknown: {
    id: `${scope}.unknown`,
    defaultMessage: 'Row {row}: {field} — {code}.',
  },
});

const bulkCreateErrorCodeMessages: Record<string, MessageDescriptor> = messages;
export default bulkCreateErrorCodeMessages;
