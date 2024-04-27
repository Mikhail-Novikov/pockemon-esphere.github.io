import { LOCATION_CHANGE } from 'redux-first-history';
import { SagaIterator } from 'redux-saga';
import { all, put, select, takeLatest } from 'redux-saga/effects';

import { actions } from './ducks';
import { selectors } from './selectors';

let queryParams: Record<string, string> = {};

/**
 * Сага на изменение location
 *
 * @returns {void}
 */
function* locationChangeSaga(): SagaIterator {
  const nextQueryParams: ReturnType<typeof selectors.queryParams> = yield select(
    selectors.queryParams,
  );

  const prevKeys = Object.keys(queryParams);
  const nextKeys = Object.keys(nextQueryParams);
  const keys = Array.from(new Set([...prevKeys, ...nextKeys]));

  for (const key of keys) {
    const prevValue = queryParams[key] ?? '';
    const nextValue = nextQueryParams[key] ?? '';
    if (prevValue !== nextValue) {
      yield put(actions.queryParamChanged(key));
    }
  }

  queryParams = nextQueryParams;
}

/**
 * Вотчер
 * @returns {void}
 */
function* watcher(): SagaIterator<void> {
  yield all([takeLatest(LOCATION_CHANGE, locationChangeSaga)]);
}

export const sagas = {
  watcher,
};
