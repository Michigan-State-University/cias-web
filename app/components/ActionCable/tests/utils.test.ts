/**
 * Test the cable URL helpers and the token refresher handed to createCable.
 */

import { writeStorage, deleteFromStorage } from '@rehooks/local-storage';

import { HEADERS } from 'utils/localStorageService';
import { AnycableTestTransport } from 'utils/testUtils/anycableTestTransport';

import { createCableUrl, getUidFromCableUrl, tokenRefresher } from '../utils';

const WEBSOCKET_URL = 'ws://localhost:3000/cable';

const HEADERS_FIXTURE = {
  'Access-Token': 'tok',
  Uid: 'user@example.com',
  Client: 'client-1',
};

describe('ActionCable utils', () => {
  beforeEach(() => {
    process.env.WEBSOCKET_URL = WEBSOCKET_URL;
    deleteFromStorage(HEADERS);
  });

  afterEach(() => {
    deleteFromStorage(HEADERS);
  });

  describe('createCableUrl', () => {
    it('builds the cable url with the auth headers as uri-encoded query params', () => {
      expect(createCableUrl(HEADERS_FIXTURE)).toBe(
        `${WEBSOCKET_URL}?access_token=tok&uid=user%40example.com&client=client-1`,
      );
    });

    it('returns null when there are no headers at all', () => {
      expect(createCableUrl(null)).toBeNull();
    });

    it.each(['Access-Token', 'Uid', 'Client'])(
      'returns null when %s is missing',
      (missing) => {
        const headers: Record<string, string> = { ...HEADERS_FIXTURE };
        delete headers[missing];

        expect(createCableUrl(headers)).toBeNull();
      },
    );
  });

  describe('getUidFromCableUrl', () => {
    it('reads the uid back out of a url built by createCableUrl', () => {
      const url = createCableUrl(HEADERS_FIXTURE)!;

      expect(getUidFromCableUrl(url)).toBe(HEADERS_FIXTURE.Uid);
    });

    it('returns null for an empty url', () => {
      expect(getUidFromCableUrl('')).toBeNull();
    });
  });

  describe('tokenRefresher', () => {
    it('retargets the transport at the url built from the current headers', async () => {
      writeStorage(HEADERS, HEADERS_FIXTURE);
      const transport = new AnycableTestTransport('ws://stale/cable');

      await tokenRefresher(transport);

      expect(transport.url).toBe(
        `${WEBSOCKET_URL}?access_token=tok&uid=user%40example.com&client=client-1`,
      );
    });

    it('leaves the transport untouched when the headers are gone', async () => {
      const transport = new AnycableTestTransport('ws://stale/cable');

      await tokenRefresher(transport);

      expect(transport.url).toBe('ws://stale/cable');
    });
  });
});
