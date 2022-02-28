import React from 'react';
import capitalize from 'lodash/capitalize';
import isEmpty from 'lodash/isEmpty';

import Badge from 'components/Badge';
import Box from 'components/Box';
import { ImageButton } from 'components/Button';
import { EllipsisText } from 'components/Text';

import { colors } from 'theme';

import EditIcon from 'assets/svg/edit.svg';
import BinIcon from 'assets/svg/bin-no-bg.svg';

import { Row, Cell, Header, HeaderCell } from './styled';

type BoxTableProps = {
  data: Record<string, string>[];
  badgeKeys: string[];
  onRowEdit?: (id: number) => void;
  onRowDelete?: (id: number) => void;
};

export const BoxTable = ({
  data,
  badgeKeys,
  onRowEdit,
  onRowDelete,
}: BoxTableProps) => {
  if (isEmpty(data)) return null;

  const keys = Object.keys(data[0]) as Array<string>;

  return (
    <Box maxWidth="100%">
      <Header>
        {keys.map((header) => (
          <HeaderCell key={`header-${header}`}>{capitalize(header)}</HeaderCell>
        ))}
      </Header>
      {data.map((row, index) => (
        <Row
          columnsNo={keys.length}
          hasEdit={!!onRowEdit}
          hasDelete={!!onRowDelete}
        >
          {keys.map((key) => (
            <Cell key={`row-${index}-key-${key}`}>
              {badgeKeys.includes(key) && (
                <Badge bgWithOpacity color={colors.jungleGreen}>
                  {row[key]}
                </Badge>
              )}
              {!badgeKeys.includes(key) && <EllipsisText text={row[key]} />}
            </Cell>
          ))}
          {onRowEdit && (
            <ImageButton
              src={EditIcon}
              fill={colors.heather}
              onClick={() => onRowEdit(index)}
            />
          )}
          {onRowDelete && (
            <ImageButton src={BinIcon} onClick={() => onRowDelete(index)} />
          )}
        </Row>
      ))}
    </Box>
  );
};

export default BoxTable;
