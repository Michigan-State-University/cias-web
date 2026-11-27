import { RoutePath } from '../router';

describe('RoutePath.PARTICIPANT_UPLOAD', () => {
  it('matches the path the API writes into exported CSV files', () => {
    expect(RoutePath.PARTICIPANT_UPLOAD).toBe('/participant-uploads/:uploadId');
  });

  it('resolves a CSV link to the route with the upload id', () => {
    const uploadId = '0b5f6d2e-1c3a-4a7b-9f01-2d3e4f5a6b7c';
    const csvCell = `https://cias.app/participant-uploads/${uploadId}`;

    const pattern = new RegExp(
      `^${RoutePath.PARTICIPANT_UPLOAD.replace(':uploadId', '([^/]+)')}$`,
    );
    const path = new URL(csvCell).pathname;

    expect(pattern.exec(path)?.[1]).toBe(uploadId);
  });
});
