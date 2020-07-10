import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { colors } from 'theme';

export const QuillStyled = styled(ReactQuill)`
  width: 100%;
  min-height: ${({ autoSize }) => autoSize && 'max-content'};
  height: ${({ autoSize, singleline }) =>
    singleline ? 'auto' : !autoSize && '150px'};
  margin-right: 9px;
  ${({ focused }) =>
    focused
      ? {
          border: `1px solid ${colors.jungleGreen}`,
          borderRadius: `10px`,
        }
      : { border: '1px solid transparent' }}
  .ql-editor {
    font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '25px')};
    font-weight: 400;
  }
  .ql-picker-label svg {
    margin-bottom: 15px !important;
  }
  .ql-bubble {
    z-index: 1000;
  }
  .ql-toolbar {
    width: max-content;
  }
`;
