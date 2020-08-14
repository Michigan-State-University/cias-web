import { useState, useRef, useEffect } from 'react';

/**
 * @param  {number} offset input offset
 * @param {boolean} initialVisible if ref element is visible at initial render
 * @returns {Array<any>} tuple with ref and current state isInViewport
 */
const useIsInViewport = (offset = 0, initialVisible = true) => {
  const ref = useRef(null);
  const [isInViewport, setIsInViewport] = useState(initialVisible);

  const checkIsInViewport = () => {
    if (!ref.current) return false;
    const { top } = ref.current.getBoundingClientRect();
    return top + offset >= 0 && top - offset <= window.innerHeight;
  };

  const eventFunc = () => {
    if (checkIsInViewport()) setIsInViewport(true);
    else setIsInViewport(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', eventFunc);
    return () => {
      window.removeEventListener('scroll', eventFunc);
    };
  }, []);

  return [ref, isInViewport];
};

export default useIsInViewport;
