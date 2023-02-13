import { useEffect, useMemo, useState } from 'react';
import Papa, { ParseConfig, ParseResult } from 'papaparse';
import isNil from 'lodash/isNil';

import { getFileUrl } from 'utils/getApiFileUrl';

export type ParsingState<ParsedRow> = {
  parsedData: ParsedRow[] | null;
  parsing: boolean;
};

export const useParseCSV = <ParsedRow,>(url: string, headers?: string[]) => {
  const [parsingState, setParsingState] = useState<ParsingState<ParsedRow>>({
    parsedData: null,
    parsing: false,
  });

  const transformHeader: ParseConfig['transformHeader'] = useMemo(() => {
    if (!headers) return undefined;
    return (header, index) => {
      if (isNil(index)) return '';
      return headers[index] ?? '';
    };
  }, [headers]);

  useEffect(() => {
    setParsingState({
      parsedData: null,
      parsing: true,
    });

    Papa.parse(getFileUrl(url), {
      header: !isNil(headers),
      transformHeader,
      download: true,
      complete: ({ data }: ParseResult<ParsedRow>) => {
        setParsingState({
          parsedData: data,
          parsing: false,
        });
      },
    });
  }, [url, headers]);

  return parsingState;
};
