import styled from 'styled-components';

export const AvatarStyled = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #107969;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  position: relative;
`;

export const DropDownContent = styled.div`
  position: absolute;
  min-width: 150px;
  top: calc(100% + 5px);
  border: 1px solid black;
  background-color: #ececec;
  text-align: center;
  color: black;
  border-radius: 10px;
  div {
    padding: 5px 0;
    border-bottom: 1px solid black;
    &:last-child {
      border-bottom: none;
    }
  }
`;
