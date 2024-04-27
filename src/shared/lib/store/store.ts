import {
  PayloadAction,
  createAction,
  PayloadActionCreator,
} from '@reduxjs/toolkit';

export const createActionTypeWithPrefix = (prefix: string) => (
  type: string,
): string => `${prefix}/${type}`;

/**
 * Создание экшн криэйтера с префиксом
 *
 * @param prefix - Префикс
 * @returns Экшен криэйтор для создания экшенов с префиксом
 */
export const createActionCreatorWithPrefix = (prefix: string) => <T = void>(
  type: string,
): PayloadActionCreator<T> =>
  createAction<T>(createActionTypeWithPrefix(prefix)(type));

/**
 * Устанавливает значение поля в сторе модуля
 *
 * @param field - Ключ поля
 * @returns Редьюсер для изменения значение поля
 */
export const setStoreField = <TState, TField extends keyof TState>(
  field: TField,
) => (
  state: TState,
  { payload }: PayloadAction<NonNullable<TState[TField]>>,
): void => {
  // eslint-disable-next-line no-param-reassign
  state[field] = payload;
};
