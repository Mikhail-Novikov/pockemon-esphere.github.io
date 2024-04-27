import { useRef, useEffect } from 'react';

/**
 * Хук размонтирования
 * @param fn функция
 * @returns void
 */
export const useUnmount = (fn: () => unknown): void => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => () => fnRef.current(), []);
};
