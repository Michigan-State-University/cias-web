import Color from 'color';
import styled, { css } from 'styled-components';
import { colors } from 'theme';

const getColumnTemplate = (columnsNo, hasEdit, hasDelete) => {
  const firstColumns =
    columnsNo > 1 ? `repeat(${columnsNo - 1}, 100px) 1fr` : '1fr';
  const editColumns = hasEdit || hasDelete ? '32px 32px' : '';

  return css`
    grid-template-columns: ${firstColumns} ${editColumns};
  `;
};

export const Row = styled.div`
  background-color: ${colors.aliceBlue};
  margin-bottom: 8px;
  padding: 15px 12px;
  align-items: center;
  border-radius: 5px;

  display: grid;
  grid-template-rows: 1fr;
  ${({ columnsNo, hasEdit, hasDelete }) =>
    getColumnTemplate(columnsNo, hasEdit, hasDelete)};
`;

export const Header = styled.div`
  display: flex;
  padding: 0 12px;
  margin-bottom: 8px;
`;

export const HeaderCell = styled.div`
  width: 100px;
  color: ${Color(colors.bluewood).alpha(0.7).rgb().string()};

  &:not(:first-of-type) {
    padding-left: 16px;
  }
`;

export const Cell = styled.div`
  padding-right: 16px;
  overflow: hidden;

  &:not(:last-of-type) {
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    border-right: 1px solid ${colors.heather};
  }

  &:last-of-type {
    div {
      max-width: 100%;
    }
  }

  &:not(:first-of-type) {
    padding-left: 16px;
  }
`;
