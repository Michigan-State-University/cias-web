import React from 'react';
import capitalize from 'lodash/capitalize';
import isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';

import Badge from 'components/Badge';
import Box from 'components/Box';
import { ImageButton } from 'components/Button';
import { EllipsisText } from 'components/Text';
import OriginalTextHover from 'components/OriginalTextHover';

import { colors } from 'theme';

import EditIcon from 'assets/svg/edit.svg';
import BinIcon from 'assets/svg/bin-no-bg.svg';

import { Row, Cell, Header, HeaderCell } from './styled';

type BoxTableProps<T> = {
  data: T[];
  originalText?: T[];
  columnKeys?: (keyof T)[];
  badgeKeys: (keyof T)[];
  onRowEdit?: (id: number) => void;
  onRowDelete?: (id: number) => void;
  containerStyleProps?: Record<string, unknown>;
  disabled?: boolean;
};

export const BoxTable = <T,>({
  data,
  columnKeys,
  badgeKeys,
  onRowEdit,
  onRowDelete,
  containerStyleProps,
  disabled = false,
  originalText,
}: BoxTableProps<T>) => {
  if (isEmpty(data)) return null;

  const keys =
    columnKeys || (Object.keys(data[0] as unknown as object) as Array<keyof T>);

  const hasTranslation = originalText && !isEmpty(originalText);

  const originalTranslationText = (index: number) =>
    hasTranslation &&
    originalText[index] &&
    `<div>
        ${keys
          ?.map((key) =>
            !badgeKeys.includes(key)
              ? `<p style="font-size:10px"><b>${upperFirst(
                  key as string,
                )}</b>: ${originalText[index][key]}</p>`
              : '',
          )
          .join('')}
      </div>`;

  return (
    <Box maxWidth="100%" {...containerStyleProps}>
      <Header>
        {keys.map((header) => (
          <HeaderCell key={`header-${header as string}`}>
            {capitalize(header.toString())}
          </HeaderCell>
        ))}
      </Header>
      {data.map((row, index) => {
        const hasIndexTranslation = hasTranslation && !!originalText[index];
        const rowTranslation =
          (hasIndexTranslation ? originalTranslationText(index) : '') || '';

        return (
          <Row
            key={`row-${index}`}
            columnsNo={keys.length}
            hasEdit={!!onRowEdit}
            hasDelete={!!onRowDelete}
            hasTranslation={hasTranslation}
          >
            {keys.map((key) => (
              <Cell key={`row-${index}-key-${key as string}`}>
                {badgeKeys.includes(key) && (
                  <Badge bgWithOpacity color={colors.jungleGreen}>
                    {row[key]}
                  </Badge>
                )}
                {!badgeKeys.includes(key) && (
                  <EllipsisText text={`${row[key] ?? ''}`} />
                )}
              </Cell>
            ))}
            <OriginalTextHover
              id={`row-translation-${index}`}
              hidden={!hasTranslation}
              text={rowTranslation}
            />
            {onRowEdit && (
              <ImageButton
                src={EditIcon}
                fill={colors.heather}
                onClick={() => onRowEdit(index)}
                disabled={disabled}
              />
            )}
            {onRowDelete && (
              <ImageButton
                src={BinIcon}
                onClick={() => onRowDelete(index)}
                disabled={disabled}
              />
            )}
          </Row>
        );
      })}
    </Box>
  );
};

export default BoxTable;
