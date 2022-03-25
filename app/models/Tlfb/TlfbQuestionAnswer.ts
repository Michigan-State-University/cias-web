// CONSUMPTION

export type SubstanceConsumption = {
  variable: string;
  consumed: Nullable<boolean>;
  amount: Nullable<string>;
};

// BODY

export type NoTlfbQuestionAnswerBody = {
  substancesConsumed: false;
  consumptions: null;
};

export type YesTlfbQuestionAnswerBody = {
  substancesConsumed: true;
  consumptions: SubstanceConsumption[];
};

export type TlfbQuestionAnswerBody =
  | NoTlfbQuestionAnswerBody
  | YesTlfbQuestionAnswerBody;

// ANSWER

export type TlfbQuestionAnswer = {
  id: number;
  dayId: number;
  body: TlfbQuestionAnswerBody;
};
