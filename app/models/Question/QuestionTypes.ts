export enum QuestionTypes {
  SINGLE = 'Question::Single',
  MULTIPLE = 'Question::Multiple',
  FREE_RESPONSE = 'Question::FreeResponse',
  THIRD_PARTY = 'Question::ThirdParty',
  NAME = 'Question::Name',
  NUMBER = 'Question::Number',
  GRID = 'Question::Grid',
  SLIDER = 'Question::Slider',
  INFORMATION = 'Question::Information',
  EXTERNAL_LINK = 'Question::ExternalLink',
  FEEDBACK = 'Question::Feedback',
  FINISH = 'Question::Finish',
  PHONE = 'Question::Phone',
  DATE = 'Question::Date',
  PARTICIPANT_REPORT = 'Question::ParticipantReport',
  CURRENCY = 'Question::Currency',
  TLFB_CONFIG = 'Question::TlfbConfig',
  TLFB_EVENTS = 'Question::TlfbEvents',
  TLFB_QUESTION = 'Question::TlfbQuestion',
}

export const TLFB_QUESTION_TYPES = [
  QuestionTypes.TLFB_CONFIG,
  QuestionTypes.TLFB_EVENTS,
  QuestionTypes.TLFB_QUESTION,
];
