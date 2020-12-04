import { QuestionBuilder } from 'models/Session/QuestionBuilder/QuestionBuilder';

const instantiateEmptyQuestion = (title, type, subtitle) =>
  new QuestionBuilder()
    .withTitle(title)
    .withSubtitle(subtitle)
    .ofType(type)
    .build();

export default instantiateEmptyQuestion;
