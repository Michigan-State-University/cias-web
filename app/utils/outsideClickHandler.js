/**
 * @param  {object} ref Reference element from DOM (obtained by `useRef()` hook)
 * @param  {function} onOutsideClick Function executed when clicked outside `ref` element
 * @returns {function} Cleanup function (execute to remove listener)
 */
export const outsideClickHandler = (ref, onOutsideClick) => {
  const handleClick = (event) => {
    const { target } = event;
    if (ref.current && !ref.current.contains(target)) {
      if (onOutsideClick) onOutsideClick();
    }
  };

  window.addEventListener('click', handleClick);

  return () => window.removeEventListener('click', handleClick);
};

export default outsideClickHandler;
