/* eslint-disable max-depth */
import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import {
  all,
  call,
  select,
  put,
  delay,
  takeEvery,
  take,
  race,
} from 'redux-saga/effects';

import { composeSaga, passActionPayload } from '@shared/lib/store';

import { findFilterMeta } from '../filter-meta';
import {
  AnyValue,
  FilterApplyMode,
  FilterValueField,
  SetFilterPayload,
} from '../types';

import { actions } from './ducks';
import { selectors } from './selectors';

const createSetFilterActionPattern = (id: string) => (
  action: PayloadAction<SetFilterPayload>,
) => action.type === actions.setFilter.type && action.payload.id === id;

const createResetFilterActionPattern = (id: string) => (
  action: PayloadAction<string>,
) => action.type === actions.resetFilter.type && action.payload === id;

const createRemoveFilterActionPattern = (id: string) => (
  action: PayloadAction<string>,
) => action.type === actions.remove.type && action.payload === id;

/**
 * Изменить field фильтра
 *
 * @returns {void}
 */
function* changeFilterFieldValueSaga({
  id,
  field,
  prevValue,
  newValue,
}: {
  id: string;
  field: FilterValueField;
  prevValue: AnyValue;
  newValue: AnyValue;
}): SagaIterator<boolean> {
  const { equalityFn } = findFilterMeta(id);
  const isEqual = equalityFn(prevValue, newValue);

  if (!isEqual) {
    yield put(actions.setFieldValue({ id, field, value: newValue }));
  }

  return !isEqual;
}

/**
 * Установить значение фильтр
 *
 * @returns {void}
 */
function* setFilterSaga({ id, value }: SetFilterPayload): SagaIterator {
  try {
    const filter: ReturnType<typeof selectors.filter> = yield select(
      selectors.filter,
      id,
    );

    if (!filter) {
      return;
    }

    const { currentValue, appliedValue, applyMode, debounceMs } = filter;

    yield call(changeFilterFieldValueSaga, {
      id,
      field: 'currentValue',
      newValue: value,
      prevValue: currentValue,
    });

    if (applyMode === FilterApplyMode.Auto) {
      if (debounceMs) {
        const [cancel] = yield race([
          take([
            createSetFilterActionPattern(id),
            createResetFilterActionPattern(id),
            createRemoveFilterActionPattern(id),
          ]),
          delay(debounceMs),
        ]);

        if (cancel) {
          return;
        }
      }

      const isChanged = yield call(changeFilterFieldValueSaga, {
        id,
        field: 'appliedValue',
        newValue: value,
        prevValue: appliedValue,
      });

      if (isChanged) {
        const changedAction = actions.createEventAction(
          id,
          'appliedValueChanged',
        );
        yield put(changedAction());
      }
    }
  } finally {
    yield put(actions.createEventAction(id, 'setFilterCompleted')());
  }
}

/**
 * Очистить фильтр
 * @param id - id фильтра
 * @returns {void}
 */
function* resetFilterSaga(id: string): SagaIterator {
  try {
    const filter: ReturnType<typeof selectors.filter> = yield select(
      selectors.filter,
      id,
    );

    if (!filter) {
      return;
    }

    const { equalityFn } = findFilterMeta(id);
    const { currentValue, appliedValue } = filter;
    const initialValue = yield select(selectors.initialValue, id);

    const isChangedCurrentValue = !equalityFn(initialValue, currentValue);
    const isChangedAppliedValue = !equalityFn(initialValue, appliedValue);

    if (isChangedCurrentValue || isChangedAppliedValue) {
      yield put(actions.reset({ id, initialValue }));
    }

    if (isChangedAppliedValue) {
      const changedAction = actions.createEventAction(
        id,
        'appliedValueChanged',
      );
      yield put(changedAction());
    }
  } finally {
    yield put(actions.createEventAction(id, 'resetFilterCompleted')());
  }
}

/**
 * Применить фильтр
 * @param id - id фильтра
 * @returns {void}
 */
function* applyFilterSaga(id: string): SagaIterator {
  try {
    const filter: ReturnType<typeof selectors.filter> = yield select(
      selectors.filter,
      id,
    );

    if (!filter) {
      return;
    }

    const { equalityFn } = findFilterMeta(id);
    const { currentValue, appliedValue } = filter;
    const isChanged = !equalityFn(currentValue, appliedValue);

    if (isChanged) {
      yield put(actions.apply(id));
      const changedAction = actions.createEventAction(
        id,
        'appliedValueChanged',
      );
      yield put(changedAction());
    }
  } finally {
    yield put(actions.createEventAction(id, 'applyFilterCompleted')());
  }
}

/**
 * Восстановить фильтр
 * @param id - id фильтра
 * @returns {void}
 */
function* restoreFilterSaga(id: string): SagaIterator {
  try {
    const filter: ReturnType<typeof selectors.filter> = yield select(
      selectors.filter,
      id,
    );

    if (!filter) {
      return;
    }

    const { currentValue, appliedValue } = filter;

    yield call(changeFilterFieldValueSaga, {
      id,
      field: 'currentValue',
      newValue: appliedValue,
      prevValue: currentValue,
    });
  } finally {
    yield put(actions.createEventAction(id, 'restoreFilterCompleted')());
  }
}

/**
 * Вотчер
 * @returns {void}
 */
function* watcher(): SagaIterator<void> {
  yield all([
    takeEvery(
      actions.setFilter,
      composeSaga(setFilterSaga, [passActionPayload]),
    ),
    takeEvery(
      actions.resetFilter,
      composeSaga(resetFilterSaga, [passActionPayload]),
    ),
    takeEvery(
      actions.applyFilter,
      composeSaga(applyFilterSaga, [passActionPayload]),
    ),
    takeEvery(
      actions.restoreFilter,
      composeSaga(restoreFilterSaga, [passActionPayload]),
    ),
  ]);
}

export const sagas = {
  watcher,
};
