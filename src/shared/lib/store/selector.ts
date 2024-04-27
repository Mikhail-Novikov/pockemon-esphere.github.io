import { useSelector } from 'react-redux';

import { CreateModelSelectorParams, PartialState } from './types';

/**
 * Объявить тип модели
 *
 * @returns возвращает null
 */
export function declareModelStateType<S>(): () => S {
  return () => null;
}

/**
 * Создает селектор модели
 *
 * @param {string} modelName - Название модели
 *
 * @returns {function} Cелектор поля модели
 */
export function createModelSelector<S, K extends string>({
  name,
}: CreateModelSelectorParams<S, K>) {
  return (state: PartialState<K, S>): S => state[name];
}

/**
 * Создает селектор поля модели
 *
 * @param {string} modelName - Название модели
 *
 * @returns {function} Cелектор поля модели
 */
export function createModelFieldSelector<S, K extends string>({
  name,
}: CreateModelSelectorParams<S, K>) {
  return <TField extends keyof S>(field: TField, defaultValue?: S[TField]) => (
    state: PartialState<K, S>,
  ): S[TField] => {
    const result = state[name]?.[field];
    return defaultValue !== undefined ? result ?? defaultValue : result;
  };
}

/**
 * Создает хук для селектора
 *
 * @param selector - селектор
 *
 * @returns хук
 */
export function createHookSelector<TState, TSelected = unknown>(
  selector: (state: TState) => TSelected,
) {
  return (): TSelected => useSelector(selector);
}

/**
 * Функция создает селектор параметров
 *
 * @param selector - функция, которая возвращает параметр
 *
 * @returns результат
 */
export function createParameterSelector<P, R>(
  selector: (params: P) => R,
): (_: unknown, params: P) => R {
  return (_, params) => selector(params);
}
