// eslint-disable-next-line no-unused-vars
import ReactQuill from 'react-quill';

/**
 * Selects text in quill edit. By default selects the whole text.
 * @param {ReactQuill} quill quill instance
 * @param {number} start starting index of a selection
 * @param {number} end end index of a selection
 */
export const selectQuillText = (quill, { start, end } = {}) => {
  const editor = quill.getEditor();

  editor.setSelection(start ?? 0, end ?? editor.getText().length);
  editor.theme.tooltip.show();
};

/**
 * Selects text in input. By default selects the whole text.
 * @param {HTMLInputElement} target focus event object
 * @param {number} start starting index of a selection
 * @param {number} end end index of a selection
 */
export const selectInputText = ({ target }, { start, end } = {}) => {
  target.setSelectionRange(start ?? 0, end ?? target.value.length);
};

export const getAriaLabelProps = ({
  placeholder,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}) => ({
  'aria-label': ariaLabel ?? (ariaLabelledBy ? undefined : placeholder),
});
