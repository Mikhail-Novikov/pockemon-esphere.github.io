import { Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import { SagaWithParameters } from '@shared/lib/store';

import { sagas } from '../model';

/**
 * Хелпер для оборачивания саги в экшены загрузки
 */
type Loader = (
  loader: string,
) => <TSaga extends Saga>(saga: TSaga) => SagaWithParameters<TSaga>;

/**
 * Хелпер для оборачивания саги в экшены загрузки
 *
 * @param loaderKey - Ключ загрузки
 * @returns Сага обернутая в withLoader
 */
export const loader: Loader = (loaderKey) => (saga) =>
  function* newSaga(...args) {
    return yield call(sagas.withLoader, {
      saga,
      loader: loaderKey,
      args,
    });
  };
