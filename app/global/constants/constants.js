export const RESOURCES_URL = 'https://www.cias.app/resources';

export const WEB_HOST = process.env.WEB_URL
  ? new URL(process.env.WEB_URL).host
  : '';
