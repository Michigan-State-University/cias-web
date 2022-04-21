import getUrlProtocol from 'utils/getApiProtocol';
import { simpleUrlRegex } from 'global/constants/regex';

export const getFileUrl = (fileApiUrl: string) =>
  simpleUrlRegex.test(fileApiUrl)
    ? fileApiUrl
    : `${getUrlProtocol(process.env.API_URL)}//${fileApiUrl}`;
