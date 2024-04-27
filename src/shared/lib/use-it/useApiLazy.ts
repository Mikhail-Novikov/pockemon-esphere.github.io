import { useState, useCallback } from 'react';
import { AxiosResponse } from 'axios';

import { useMounted } from './useMounted';

export type ApiFunction<T, Args extends unknown[] = unknown[]> = (
  ...args: Args
) => Promise<AxiosResponse<T>>;

type State<T> = {
  /** Данные из запроса */
  data?: T;
  /** Ошибка запроса */
  error?: Error;
  /** Состояние выполнения запроса */
  isLoading: boolean;
};

/** Результат */
export type UseApiLazyResult<T, Args extends unknown[] = unknown[]> = State<
  T
> & {
  /** Обработчик выполнения запроса */
  lazy: (...params: Args) => void;
  /** сбросить данные */
  reset: () => void;
};

/**
 * Хук для использования методов апи в компонентах
 * @param apiFn - функция вызывающая метод апи
 * @param context - контекст выполнения функции
 * @returns результат
 */
export function useApiLazy<T, Args extends unknown[] = unknown[]>(
  apiFn: ApiFunction<T, Args>,
  context?: unknown,
): UseApiLazyResult<T, Args> {
  const isMounted = useMounted();

  const [state, setState] = useState<State<T>>({
    isLoading: false,
  });

  const reset = useCallback(() => {
    setState({ isLoading: false });
  }, []);

  const lazy = useCallback(
    async (...args: Args) => {
      const api: typeof apiFn = context ? apiFn.bind(context) : apiFn;

      setState({ isLoading: true });
      try {
        const { data } = await api(...args);

        if (isMounted()) {
          setState({ data, isLoading: false });
        }
      } catch (error) {
        if (isMounted()) {
          setState({ error, isLoading: false });
        }
      }
    },
    [apiFn, context],
  );

  return { ...state, lazy, reset };
}
