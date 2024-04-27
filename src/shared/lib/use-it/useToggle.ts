import { useReducer } from 'react';

const toggleReducer = (state: boolean, nextValue?: boolean) =>
  typeof nextValue === 'boolean' ? nextValue : !state;

type UseToggleHook = [boolean, (nextValue?: boolean) => void];

/**
 * Хук для работы с булевыми значениями
 *
 * @param {boolean} initialValue - начальное значение
 *
 * @returns {UseToggleHook} Результат
 */
export const useToggle = (initialValue: boolean): UseToggleHook =>
  useReducer(toggleReducer, initialValue);
