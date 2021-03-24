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

/**
 * @param {object} targetRef ref from element for which we want to detect outside clicks
 * @param {function(): void} onClick callback function to execute
 * @param {boolean} active false when we want to disable the outside click handler
 */
const useOutsideClick = (targetRef, onClick, active) => {
  const handleClick = event => {
    const { target } = event;
    if (targetRef.current && !refContains(targetRef, target)) {
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
