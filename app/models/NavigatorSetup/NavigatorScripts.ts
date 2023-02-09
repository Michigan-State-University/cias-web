export type ParsedNavigatorScriptsFileRow = {
  header: string;
  sampleMessage: string;
};

export type NavigatorScriptsGroup = {
  header: string;
  sampleMessages: string[];
};

export const navigatorScriptConfig = {
  headers: [
    { name: 'Header', inputName: 'header', required: true },
    { name: 'Sample message', inputName: 'sampleMessage', required: true },
  ],
  isHeaderNameOptional: false,
};

export const navigatorScriptHeaders = navigatorScriptConfig.headers.map(
  ({ inputName }) => inputName,
);
