import { SagaIterator } from 'redux-saga';
import {
  all,
  call,
  put,
  SagaReturnType,
  select,
  takeEvery,
} from 'redux-saga/effects';

import { pokemonApi } from '@shared/api';
import { composeSaga, passActionPayload } from '@shared/lib/store';
import { errorHandler } from '@shared/lib/store-error';
import { loader } from '@shared/lib/store-loader';

import { pokemonModel } from '@entities/pokemon';
import { actions } from './ducks';
import { pagingSelector } from './selectors';

/**
 * Процесс применения фильтра, пагинации
 * @returns {void}
 */
function* pagingSaga(): SagaIterator {
  const { page, size } = yield select(pagingSelector);

  const pagingData: SagaReturnType<typeof pokemonApi.getPokemonsList> = yield call(
    pokemonApi.getPokemonsList,
    { size, page },
  );

  yield put(pokemonModel.actions.setPokemons(pagingData));
}

/**
 * Вотчер
 * @returns {void}
 */
function* watcher(): SagaIterator {
  yield all([
    takeEvery(
      actions.setPaging,
      composeSaga(pagingSaga, [
        passActionPayload,
        errorHandler(),
        loader(pokemonModel.config.loaders.loadPokemons),
      ]),
    ),
  ]);
}

export const sagas = {
  watcher,
  paging: composeSaga(pagingSaga, [
    errorHandler(),
    loader(pokemonModel.config.loaders.loadPokemons),
  ]),
};
