import { createMd5, md5Base64, md5Base64OfFile } from 'utils/md5';

const encode = (text: string) =>
  Uint8Array.from(text, (character) => character.charCodeAt(0));

const blobOf = (bytes: Uint8Array): Blob =>
  ({
    size: bytes.length,
    slice: (start: number, end: number) => ({
      arrayBuffer: async () => bytes.slice(start, end).buffer,
    }),
  }) as unknown as Blob;

const hex = (base64: string) =>
  Array.from(atob(base64))
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');

describe('md5', () => {
  it.each([
    ['', 'd41d8cd98f00b204e9800998ecf8427e'],
    ['a', '0cc175b9c0f1b6a831c399e269772661'],
    ['abc', '900150983cd24fb0d6963f7d28e17f72'],
    ['message digest', 'f96b697d7cb7938d525a2f31aaf161d0'],
    ['abcdefghijklmnopqrstuvwxyz', 'c3fcd3d76192e4007dfb496cca67e13b'],
    [
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      'd174ab98d277d9f5a5611c2c9f419d9f',
    ],
    [
      '12345678901234567890123456789012345678901234567890123456789012345678901234567890',
      '57edf4a22be3c955ac49da2e2107b67a',
    ],
  ])('hashes %p', (input, expected) => {
    expect(hex(md5Base64(encode(input)))).toEqual(expected);
  });

  it('returns the digest base64 encoded, as Active Storage expects', () => {
    expect(md5Base64(encode('abc'))).toEqual('kAFQmDzST7DWlj99KOF/cg==');
  });

  it.each([54, 55, 56, 57, 63, 64, 65, 127, 128, 129])(
    'matches a single-shot hash for a %i byte payload split across chunks',
    async (size) => {
      const bytes = new Uint8Array(size).map((_, index) => index % 256);
      const file = blobOf(bytes);

      await expect(md5Base64OfFile(file)).resolves.toEqual(md5Base64(bytes));
    },
  );

  it('matches when the bytes start at an unaligned offset', () => {
    const backing = new Uint8Array(1 + 256).map((_, index) => index % 256);
    const unaligned = backing.subarray(1);

    expect(unaligned.byteOffset % 4).not.toBe(0);
    expect(md5Base64(unaligned)).toEqual(md5Base64(Uint8Array.from(unaligned)));
  });

  it.each([[1], [7], [13], [31], [63], [65], [100]])(
    'matches a single-shot hash when fed in %i byte updates',
    (step) => {
      const bytes = new Uint8Array(521).map((_, index) => (index * 7) % 256);

      const md5 = createMd5();
      for (let offset = 0; offset < bytes.length; offset += step) {
        md5.update(bytes.subarray(offset, offset + step));
      }

      expect(md5.digestBase64()).toEqual(md5Base64(bytes));
    },
  );

  it('hashes a payload larger than one read chunk', async () => {
    const bytes = new Uint8Array(5 * 1024 * 1024).map((_, i) => (i * 31) % 256);

    await expect(md5Base64OfFile(blobOf(bytes))).resolves.toEqual(
      md5Base64(bytes),
    );
  });
});
