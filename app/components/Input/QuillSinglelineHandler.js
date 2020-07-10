/* eslint-disable prefer-rest-params, no-param-reassign, func-names */
import { Quill } from 'react-quill';

const Clipboard = Quill.import('modules/clipboard');
const Delta = Quill.import('delta');

function CustomClipboard() {
  return Reflect.construct(Clipboard, arguments, CustomClipboard);
}

// use function to access proper `this`
CustomClipboard.prototype.onPaste = function(e) {
  const self = this;
  const { options } = this;

  if (e.defaultPrevented || !this.quill.isEnabled()) return;

  const range = this.quill.getSelection();
  let delta = new Delta().retain(range.index);
  const { scrollTop } = this.quill.scrollingContainer;

  this.container.focus();
  this.quill.selection.update(Quill.sources.SILENT);
  setTimeout(() => {
    delta = delta.concat(self.convert()).delete(range.length);

    if (options.newLines === false) {
      delta.ops.map(op => {
        if (!(typeof op.insert === 'undefined')) {
          op.insert = op.insert.replace(/(\r\n|\n|\r)/gm, ' ');
        }
        return op;
      });
    }

    self.quill.updateContents(delta, Quill.sources.USER);
    // range.length contributes to delta.length()
    self.quill.setSelection(
      delta.length() - range.length,
      Quill.sources.SILENT,
    );
    self.quill.scrollingContainer.scrollTop = scrollTop;
    self.quill.focus();
  }, 1);
};

Reflect.setPrototypeOf(CustomClipboard.prototype, Clipboard.prototype);
Reflect.setPrototypeOf(CustomClipboard, Clipboard);

Quill.register('modules/clipboard', CustomClipboard, true);
