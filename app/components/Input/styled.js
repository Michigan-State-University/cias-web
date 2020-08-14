import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { colors, fontFamily } from 'theme';

export const QuillStyled = styled(ReactQuill)`
  width: 100%;
  min-height: ${({ autoSize }) => autoSize && 'max-content'};
  height: ${({ autoSize, singleline }) =>
    singleline ? 'auto' : !autoSize && '150px'};
  ${({ focused }) =>
    focused
      ? {
          border: `1px solid ${colors.jungleGreen}`,
          borderRadius: `10px`,
          '.ql-bubble': {
            zIndex: 1000,
          },
        }
      : { border: '1px solid transparent' }}
  .ql-editor {
    font-weight: 400;
    padding: 10px;
  }
  .ql-editor.ql-blank::before {
    left: 11px;
  }
  .ql-picker-label svg {
    margin-bottom: 15px !important;
  }
  .ql-toolbar {
    width: max-content;
  }
  .ql-container {
    font-size: initial;
    font-family: ${fontFamily};
  }
`;
