import { useCallback, useEffect, useRef } from 'react';

/**
 * Хук для проверки монтирован компонент или нет
 *
 * @returns функция для проверки
 */
export const useMounted = (): (() => boolean) => {
  const mountedRef = useRef(false);

  const isMounted = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return isMounted;
};
