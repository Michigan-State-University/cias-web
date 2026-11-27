/* eslint-disable no-bitwise -- MD5 is defined in terms of 32-bit bitwise
   operations; writing it any other way would obscure the algorithm. */

import { arrayBufferToBase64 } from 'utils/arrayBufferToBase64';

const SHIFTS = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5,
  9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11,
  16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15,
  21,
];

const SINE_TABLE = (() => {
  const table = new Int32Array(64);
  for (let i = 0; i < 64; i += 1) {
    table[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32) | 0;
  }
  return table;
})();

const WORD_INDEX = (() => {
  const table = new Uint8Array(64);
  for (let i = 0; i < 64; i += 1) {
    if (i < 16) table[i] = i;
    else if (i < 32) table[i] = (5 * i + 1) % 16;
    else if (i < 48) table[i] = (3 * i + 5) % 16;
    else table[i] = (7 * i) % 16;
  }
  return table;
})();

const BLOCK_SIZE = 64;

const LITTLE_ENDIAN = (() => {
  const probe = new ArrayBuffer(4);
  new DataView(probe).setInt32(0, 1, true);
  return new Int32Array(probe)[0] === 1;
})();

const rotateLeft = (value: number, shift: number) =>
  (value << shift) | (value >>> (32 - shift));

class Md5 {
  private state = new Int32Array([
    0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476,
  ]);

  private tail = new Uint8Array(BLOCK_SIZE);

  private tailLength = 0;

  private byteCount = 0;

  private readonly words = new Int32Array(16);

  update(chunk: Uint8Array): void {
    this.byteCount += chunk.length;

    let offset = 0;

    if (this.tailLength > 0) {
      const needed = BLOCK_SIZE - this.tailLength;
      if (chunk.length < needed) {
        this.tail.set(chunk, this.tailLength);
        this.tailLength += chunk.length;
        return;
      }
      this.tail.set(chunk.subarray(0, needed), this.tailLength);
      this.processBlocks(this.tail, 0, BLOCK_SIZE);
      this.tailLength = 0;
      offset = needed;
    }

    const blocksEnd =
      offset + Math.floor((chunk.length - offset) / BLOCK_SIZE) * BLOCK_SIZE;
    if (blocksEnd > offset) {
      this.processBlocks(chunk, offset, blocksEnd);
      offset = blocksEnd;
    }

    if (offset < chunk.length) {
      this.tail.set(chunk.subarray(offset), 0);
      this.tailLength = chunk.length - offset;
    }
  }

  digest(): Uint8Array {
    const bitLength = this.byteCount * 8;

    const paddingLength =
      this.tailLength < 56 ? 56 - this.tailLength : 120 - this.tailLength;
    const padded = new Uint8Array(this.tailLength + paddingLength + 8);
    padded.set(this.tail.subarray(0, this.tailLength), 0);
    padded[this.tailLength] = 0x80;

    const view = new DataView(padded.buffer);

    view.setUint32(padded.length - 8, bitLength >>> 0, true);
    view.setUint32(padded.length - 4, Math.floor(bitLength / 2 ** 32), true);

    this.processBlocks(padded, 0, padded.length);

    const digest = new Uint8Array(16);
    const digestView = new DataView(digest.buffer);
    this.state.forEach((word, index) =>
      digestView.setInt32(index * 4, word, true),
    );
    return digest;
  }

  private processBlocks(bytes: Uint8Array, start: number, end: number): void {
    const absoluteStart = bytes.byteOffset + start;

    if (LITTLE_ENDIAN && absoluteStart % Int32Array.BYTES_PER_ELEMENT === 0) {
      const view = new Int32Array(
        bytes.buffer,
        absoluteStart,
        (end - start) / Int32Array.BYTES_PER_ELEMENT,
      );
      for (let base = 0; base < view.length; base += 16) {
        this.processWords(view, base);
      }
      return;
    }

    const { words } = this;
    for (let offset = start; offset < end; offset += BLOCK_SIZE) {
      for (let i = 0; i < 16; i += 1) {
        const at = offset + i * 4;
        words[i] =
          bytes[at] |
          (bytes[at + 1] << 8) |
          (bytes[at + 2] << 16) |
          (bytes[at + 3] << 24);
      }
      this.processWords(words, 0);
    }
  }

  private processWords(words: Int32Array, base: number): void {
    const { state } = this;
    let a = state[0];
    let b = state[1];
    let c = state[2];
    let d = state[3];

    for (let i = 0; i < 64; i += 1) {
      let f: number;

      if (i < 16) {
        f = (b & c) | (~b & d);
      } else if (i < 32) {
        f = (d & b) | (~d & c);
      } else if (i < 48) {
        f = b ^ c ^ d;
      } else {
        f = c ^ (b | ~d);
      }

      const temp = d;
      d = c;
      c = b;

      b =
        (b +
          rotateLeft(
            (a + f + SINE_TABLE[i] + words[base + WORD_INDEX[i]]) | 0,
            SHIFTS[i],
          )) |
        0;
      a = temp;
    }

    this.state[0] = (this.state[0] + a) | 0;
    this.state[1] = (this.state[1] + b) | 0;
    this.state[2] = (this.state[2] + c) | 0;
    this.state[3] = (this.state[3] + d) | 0;
  }
}

export type Md5Hasher = {
  update: (bytes: Uint8Array) => void;
  digestBase64: () => string;
};

export const createMd5 = (): Md5Hasher => {
  const md5 = new Md5();
  return {
    update: (bytes) => md5.update(bytes),
    digestBase64: () => arrayBufferToBase64(md5.digest()),
  };
};

export const md5Base64 = (bytes: Uint8Array): string => {
  const md5 = createMd5();
  md5.update(bytes);
  return md5.digestBase64();
};

const CHUNK_SIZE = 256 * 1024;

export const md5Base64OfFile = async (file: Blob): Promise<string> => {
  const md5 = createMd5();

  for (let offset = 0; offset < file.size; offset += CHUNK_SIZE) {
    const slice = file.slice(offset, offset + CHUNK_SIZE);
    // eslint-disable-next-line no-await-in-loop
    const buffer = await slice.arrayBuffer();
    md5.update(new Uint8Array(buffer));
  }

  return md5.digestBase64();
};
