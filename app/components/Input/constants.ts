import { paddings } from 'theme';

export const INPUT_PADDING: number = +(paddings.small.match(/\d*/)?.[0] ?? 0);

export const dateStringGroupsMaxLengthsByIndex = {
  0: 2,
  1: 2,
};
