import blurDocument from 'utils/blurDocument';

describe('blurDocument test', () => {
  it('should blur all elements in document', () => {
    const actual = document.createElement('input');
    document.body.appendChild(actual);
    actual.focus();
    expect(actual).toEqual(document.activeElement);

    blurDocument();
    expect(actual).not.toEqual(document.activeElement);
  });
});
