import { paddings } from 'theme';

export const INPUT_PADDING: number = +(paddings.small.match(/\d*/)?.[0] ?? 0);
