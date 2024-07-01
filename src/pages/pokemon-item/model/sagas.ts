import { SagaIterator } from 'redux-saga';
import { put, call, all, takeEvery } from 'redux-saga/effects';

import { createGate } from '@shared/lib/store-gate';
import { genId } from '@shared/lib/id';
import { cancelOn, composeSaga } from '@shared/lib/store';
import { errorHandler } from '@shared/lib/store-error';

import { pokemonModel } from '@entities/pokemon';

/** Гейт страницы */
export const pageGate = createGate({ id: genId() });

/**
 * Открытие гейта
 * @returns {void}
 */
function* gateOpenedSaga(): SagaIterator {
  yield call(pokemonModel.sagas.loadPokemonsNames);
}

/**
 * Закрытие гейта
 *
 * @returns {void}
 */
function* gateClosedSaga(): SagaIterator {
  yield put(pokemonModel.actions.reset());
}

/**
 * Вотчер
 * @returns {void}
 */
function* watcher(): SagaIterator<void> {
  yield all([
    takeEvery(
      pageGate.actions.opened,
      composeSaga(gateOpenedSaga, [
        errorHandler(),
        cancelOn(pageGate.actions.closed),
      ]),
    ),
    takeEvery(
      pageGate.actions.closed,
      composeSaga(gateClosedSaga, [errorHandler()]),
    ),
  ]);
}

export const sagas = {
  watcher,
};
