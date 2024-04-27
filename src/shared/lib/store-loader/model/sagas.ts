import { SagaIterator, Saga } from 'redux-saga';
import { call, put, SagaReturnType } from 'redux-saga/effects';

import { SagaWrapperParams } from '@shared/lib/store';

import { actions } from './ducks';

/**
 * Параметры саги, которая оборачивает сагу в экшены старта и остановки загрузки
 */
type WithLoaderParams<TSaga extends Saga> = SagaWrapperParams<TSaga> & {
  /** Ключ загрузки */
  loader: string;
};

/**
 * Оборачивает сагу в экшены старта и остановки загрузки
 * @param params - параметры
 *
 * @returns результат
 */
function* withLoader<TSaga extends Saga>({
  saga,
  loader,
  args,
}: WithLoaderParams<TSaga>): SagaIterator<SagaReturnType<TSaga>> {
  try {
    yield put(actions.show(loader));

    return yield call(saga, ...args);
  } finally {
    yield put(actions.hide(loader));
  }
}

export const sagas = {
  withLoader,
};
