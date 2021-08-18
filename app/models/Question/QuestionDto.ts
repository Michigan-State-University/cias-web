import { PatternDto } from 'models/Pattern/PatternDto';
import { SessionTypes } from 'models/Session/SessionDto';

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
}

export enum BlockTypes {
  BODY_ANIMATION = 'BodyAnimation',
  HEAD_ANIMATION = 'HeadAnimation',
  SPEECH = 'Speech',
  READ_QUESTION = 'ReadQuestion',
  REFLECTION = 'Reflection',
  REFLECTION_FORMULA = 'ReflectionFormula',
  PAUSE = 'Pause',
  FEEDBACK = 'Feedback',
}

interface Block {
  text: string[];
  type: BlockTypes;
  action: string;
  sha256: string[];
  animation: string;
  audio_urls: string[];
  endPosition: {
    x: number;
    y: number;
  };
}

export interface QuestionDto {
  id: string;
  type: QuestionTypes;
  question_group_id: string;
  settings: {
    image: boolean;
    title: boolean;
    video: boolean;
    required: boolean;
    subtitle: boolean;
    proceed_button?: boolean;
    narrator_skippable: boolean;
  };
  position: number;
  title: string;
  subtitle: string;
  narrator: {
    blocks: Block[];
    settings: {
      voice: boolean;
      animation: boolean;
    };
  };
  video_url: null | string;
  image_url: null | string;
  image_alt: null | string;
  original_text: {
    title: string;
    subtitle: string;
    image_description: string;
  };
  body: any;
  formula: {
    payload: string;
    patterns: PatternDto<QuestionTypes | SessionTypes>[];
  };
}
