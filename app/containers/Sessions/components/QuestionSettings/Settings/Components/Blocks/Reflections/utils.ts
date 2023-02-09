import { ReflectableQuestion } from 'models/ReflectableQuestion';
import { QuestionTypes } from 'models/Question';

import { htmlToPlainText } from 'utils/htmlToPlainText';

export const setUpReflections = (question: ReflectableQuestion) => {
  switch (question.type) {
    case QuestionTypes.SINGLE: {
      const variableName = question.body.variable.name;

      return question.body.data.map((el) => ({
        variable: variableName,
        value: el.value,
        payload: htmlToPlainText(el.payload),
        text: [],
        sha256: [],
        audio_urls: [],
      }));
    }
    case QuestionTypes.MULTIPLE: {
      return question.body.data.map((el) => ({
        variable: el.variable.name,
        value: el.variable.value,
        payload: htmlToPlainText(el.payload),
        text: [],
        sha256: [],
        audio_urls: [],
      }));
    }
    case QuestionTypes.GRID: {
      const reflections = [];
      const { rows } = question.body.data[0].payload;
      const { columns } = question.body.data[0].payload;

      /* eslint-disable-next-line no-restricted-syntax */
      for (const row of rows) {
        /* eslint-disable-next-line no-restricted-syntax */
        for (const column of columns) {
          reflections.push({
            variable: row.variable.name,
            value: column.variable.value,
            payload: `${htmlToPlainText(row.payload)} - ${htmlToPlainText(
              column.payload,
            )}`,
            text: [],
            sha256: [],
            audio_urls: [],
          });
        }
      }

      return reflections;
    }
    default:
      return [];
  }
};
