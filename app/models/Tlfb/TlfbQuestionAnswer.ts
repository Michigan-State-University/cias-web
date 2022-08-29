// CONSUMPTION

export type SubstanceConsumption = {
  variable: string;
  consumed: Nullable<boolean>;
  amount: Nullable<string>;
  name: string;
};

// BODY

export type NoTlfbQuestionAnswerBody = {
  substancesConsumed: false;
  consumptions: Nullable<SubstanceConsumption[]>;
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
