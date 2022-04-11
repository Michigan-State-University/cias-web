import { colors } from 'theme';

import { TextMessageType } from './TextMessageType';

export const textMessageTypeColors: ReadonlyMap<TextMessageType, string> =
  new Map<TextMessageType, string>([
    [TextMessageType.NORMAL, colors.electricPurple],
    [TextMessageType.ALERT, colors.vermilion],
  ]);
