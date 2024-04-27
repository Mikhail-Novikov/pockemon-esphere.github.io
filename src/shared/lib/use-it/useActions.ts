/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

/**
 * Фабричный метод. Создает хук `useActions`
 *
 * @param {object} actions - объект с экшанами
 *
 * @example
 *
 * // actions.js
 * export const doSomething = e => ({
 *   type: 'sometype',
 *   payload: e.target.value,
 * })
 *
 * export const useActions = createUseActionsHook({ doSomething })
 *
 * // component.js
 * import React from 'react'
 * import { useActions } from './actions'
 *
 * export const MyComponent = ({ id, text }) => {
 *   const {doSomething} = useActions()
 *   return (
 *     <button value={id} onClick={doSomething}>
 *       {text}
 *     </button>
 *   )
 * }
 *
 * @returns {function} Хук `useActions`
 */
export function createActionsHook<T>(actions: T) {
  return function useActionsHook(deps: any[]): T {
    const dispatch = useDispatch();
    return useMemo(
      () => {
        if (Array.isArray(actions)) {
          return actions.map((action) => bindActionCreators(action, dispatch));
        }
        return bindActionCreators(actions as any, dispatch);
      },
      deps ? [dispatch, ...deps] : [dispatch],
    ) as T;
  };
}

/**
 * Хук привязывает dispatch к экшенам
 *
 * @param {object} actions - объект с экшанами
 * @param {Array} deps - массив зависимостей, опционально
 *
 * @returns {object} объект с экшанами обернутыми в dispatch
 */
export function useActions<T>(actions: T, deps?: any[]): T {
  return createActionsHook(actions)(deps);
}
