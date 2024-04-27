import { useEffect } from 'react';

import { ApiFunction, UseApiLazyResult, useApiLazy } from './useApiLazy';

/** Результат */
type UseApiResult<T, Args extends unknown[] = unknown[]> = Pick<
  UseApiLazyResult<T, Args>,
  'data' | 'error' | 'isLoading'
>;

/**
 * Хук для использования методов апи в компонентах
 *
 * @param apiFn - функция вызывающая метод апи
 * @param context - контекст выполнения функции
 * @param args - аргументы
 *
 * @returns результат
 */
export function useApi<T, Args extends unknown[] = unknown[]>(
  { apiFn, context }: { apiFn: ApiFunction<T, Args>; context?: unknown },
  ...args: Args
): UseApiResult<T, Args> {
  const { data, error, isLoading, lazy } = useApiLazy(apiFn, context);
  useEffect(() => {
    lazy(...args);
  }, [lazy]);

  return { data, error, isLoading };
}
