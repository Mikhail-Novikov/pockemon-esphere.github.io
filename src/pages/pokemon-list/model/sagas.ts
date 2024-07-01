import { SagaIterator } from 'redux-saga';
import { put, call, all, takeEvery } from 'redux-saga/effects';

import { createGate } from '@shared/lib/store-gate';
import { genId } from '@shared/lib/id';
import { cancelOn, composeSaga } from '@shared/lib/store';
import { errorHandler } from '@shared/lib/store-error';

import { toastModel, ToastType } from '@entities/toast';
import { pokemonModel } from '@entities/pokemon';
import { DEFAULT_POKEMONS } from '@shared/constants';

/** Гейт страницы */
export const pageGate = createGate({ id: genId() });

/**
 * Открытие гейта
 * @returns {void}
 */
function* gateOpenedSaga(): SagaIterator {
  yield call(pokemonModel.sagas.loadPokemons, {
    offset: 0,
    size: DEFAULT_POKEMONS.pokemonsLimit,
  });
  // подгрузка имен покемонов для автокомплита поиска
  yield call(pokemonModel.sagas.loadPokemonsNames);

  yield put(
    toastModel.actions.showToast({
      type: ToastType.Success,
      text: 'Успешная загрузка.',
    }),
  );
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
  ]);
}

export const sagas = {
  watcher,
};
