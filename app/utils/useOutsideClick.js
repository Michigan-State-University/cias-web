import { useEffect } from 'react';
import ReactQuill from 'react-quill';

const refContains = (ref, target) => {
  const instance = ref.current;

  switch (instance.constructor) {
    case ReactQuill:
      return instance.editingArea.contains(target);
    case HTMLElement:
    default:
      return instance.contains(target);
  }
};

const didClickOutsideAllRefs = (refs, target) => {
  if (Array.isArray(refs))
    return refs.every(ref => didClickOutside(ref, target));

  return didClickOutside(refs, target);
};

const didClickOutside = (ref, target) =>
  ref.current && !refContains(ref, target);

/**
 * @param {object|object[]} targetRef ref(s) from element(s) for which we want to detect outside clicks
 * @param {function(): void} onClick callback function to execute
 * @param {boolean} active false when we want to disable the outside click handler
 */
const useOutsideClick = (targetRef, onClick, active) => {
  const handleClick = event => {
    const { target } = event;

    if (didClickOutsideAllRefs(targetRef, target)) {
      if (onClick) onClick();
    }
  };

  useEffect(() => {
    if (active) {
      document.addEventListener('mousedown', handleClick);
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }
  }, [targetRef, active, onClick]);
};

export default useOutsideClick;
