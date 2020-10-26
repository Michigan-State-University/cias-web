import { calculateWidth } from '../containerBreakpoints';

describe('containerBreakpoints', () => {
  it('should return correct width', () => {
    expect(calculateWidth(600)).toEqual('540px');
  });
  it('should return correct initial width for small screens', () => {
    expect(calculateWidth(200)).toEqual('initial');
  });
});
