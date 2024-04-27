import { useEffect } from 'react';

/**
 * Хук для обработки жизненного цикла
 *
 * @param mount обработчик монтирования
 * @param unmount обработчик размонтирования
 *
 * @returns {void}
 */
export const useLifecycles = (
  mount: () => void,
  unmount?: () => void,
): void => {
  useEffect(() => {
    if (mount) {
      mount();
    }
    return () => {
      if (unmount) {
        unmount();
      }
    };
  }, []);
};
