import { useEffect } from 'react';

/**
 * @param {number} targetKey key code for which want to detect the click
 * @param {Function} onKeyPress callback function to execute
 * @param {boolean} shouldListen condition based on which hook should be executed
 */
const useKeyPress = (targetKey, onKeyPress, shouldListen = true) => {
  const handleKeyUp = ({ keyCode }) => {
    if (keyCode === targetKey) {
      if (onKeyPress) onKeyPress();
    }
  };

  useEffect(() => {
    if (shouldListen) {
      document.addEventListener('keyup', handleKeyUp);
      return () => {
        document.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [shouldListen]);
};

export default useKeyPress;
