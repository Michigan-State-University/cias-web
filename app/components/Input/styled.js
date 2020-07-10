import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { colors } from 'theme';

export const QuillStyled = styled(ReactQuill)`
  width: 100%;
  ${({ autoSize }) =>
    autoSize ? { minHeight: 'max-content' } : { height: '150px' }};
  margin-right: 9px;
  ${({ focused }) =>
    focused &&
    `
    border: 1px solid ${colors.jungleGreen};
     border-radius: 10px;
    `}
  .ql-editor {
    font-size: 25px;
    font-weight: 400;
  }
  .ql-picker-label svg {
    margin-bottom: 15px !important;
  }
`;
