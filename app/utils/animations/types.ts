export type TSpeechAnimation = {
  animations: {
    [ESpeechPhase.START]?: string;
    [ESpeechPhase.SPEECH]: string;
    [ESpeechPhase.END]?: string;
  };
  isEndReversed?: boolean;
};

export enum ESpeechPhase {
  START = 'start',
  SPEECH = 'speech',
  END = 'end',
}
