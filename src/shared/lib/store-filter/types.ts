import { PayloadActionCreator } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';

import { PartialState } from '@shared/lib/store';

import { config } from './config';

export type EqualityFn<T> = (val1: T, val2: T) => boolean;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyValue = any;

/** Тип установки фильтра */
export enum FilterApplyMode {
  /** Автоматический */
  Auto,
  /** Ручной (необходимо вызывать метод apply у фильтра) */
  Manual,
}

type InitialValueFn<T> = (state: AnyValue) => T;
type InitialValue<T> = T | InitialValueFn<T>;

/** Фильтр */
export type Filter<T> = {
  /** id фильтра */
  id: string;
  /** тип установки */
  applyMode: FilterApplyMode;
  /** наименование фильтра */
  title?: string;
  actions: {
    /** событие изменения примененного значения */
    appliedValueChanged: PayloadActionCreator<void>;
  };
  selectors: {
    /** полное состояние фильтра */
    filter: (state: unknown) => FilterState<T>;
    /** начальное значение */
    initialValue: (state: unknown) => T;
    /** текущее значение */
    currentValue: (state: unknown) => T;
    /** примененное значение */
    appliedValue: (state: unknown) => T;
    /** признак что фильтр не установлен */
    isEmpty: (state: unknown) => boolean;
  };
  sagas: {
    /** установка фильтра  */
    set: (value: T) => SagaIterator;
    /** подтверждение фильтра (устанавливается значение appliedValue равное currentValue) */
    apply: () => SagaIterator;
    /** восстановление фильтра (устанавливается значение currentValue равное appliedValue) */
    restore: () => SagaIterator;
    /** очистка фильтра */
    reset: () => SagaIterator;
  };
};

export type FilterType<TFilter extends Filter<AnyValue>> = ReturnType<
  TFilter['selectors']['initialValue']
>;

/** Входные параметры для создания фильтра */
export type FilterCreateParams<T> = {
  /** id фильтра */
  id: string;
  /** наименование фильтра */
  title?: string;
  /** начальное значение (может быть селектором) */
  initialValue: InitialValue<T>;
  /** тип установки (по умолчанию FilterApplyMode.Auto) */
  applyMode?: FilterApplyMode;
  /** задержка для debounce в мс, если не установлен или 0 - то отключить debounce */
  debounceMs?: number;
  /** функция сравнения 2х значений (по умолчанию shallowEqual) */
  equalityFn?: EqualityFn<T>;
};

export type FilterState<T> = {
  /** примененное значение */
  appliedValue: T;
  /** текущее значение */
  currentValue: T;
  /** тип установки */
  applyMode?: FilterApplyMode;
  /** задержка для debounce в мс, если не установлен или 0 - то отключить debounce */
  debounceMs?: number;
};

export type FilterMeta = {
  /** селектор начального значения */
  initialValueSelector: InitialValueFn<AnyValue>;
  /** функция сравнения 2х значений */
  equalityFn: EqualityFn<AnyValue>;
};

export type FilterValueField = keyof Pick<
  FilterState<AnyValue>,
  'appliedValue' | 'currentValue'
>;

export type AddFilterPayload = {
  id: string;
  initialValue: AnyValue;
  applyMode: FilterApplyMode;
  debounceMs?: number;
};

export type ResetFilterPayload = {
  id: string;
  initialValue: AnyValue;
};

export type SetFilterFieldValuePayload = {
  id: string;
  value: AnyValue;
  field: FilterValueField;
};

export type SetFilterPayload = {
  id: string;
  value: AnyValue;
};

export type ModelState = Record<string, FilterState<unknown>>;

export type ModelStoreState = PartialState<typeof config.modelName, ModelState>;
