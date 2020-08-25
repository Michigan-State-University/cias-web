import { useEffect } from 'react';

/**
 * @param {string} targetKey key code for which want to detect the click
 * @param {func} onKeyPress callback function to execute
 */
const useKeyPress = (targetKey, onKeyPress) => {
  const handleKeyUp = ({ keyCode }) => {
    if (keyCode === targetKey) {
      if (onKeyPress) onKeyPress();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp, false);
    return () => {
      document.removeEventListener('keyup', handleKeyUp, false);
    };
  }, []);
};

export default useKeyPress;
