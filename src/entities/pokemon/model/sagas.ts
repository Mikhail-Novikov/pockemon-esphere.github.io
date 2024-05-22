import { SagaIterator } from 'redux-saga';
import { put, call, SagaReturnType } from 'redux-saga/effects';

import { pokemonApi } from '@shared/api';
import { composeSaga } from '@shared/lib/store';
import { loader } from '@shared/lib/store-loader';

import { config } from '../config';

import { actions } from './ducks';

/**
 * Загрузка списка покемонов
 *
 * @returns {void}
 */
function* loadPokemonsSaga(): SagaIterator {
  const pokemons: SagaReturnType<typeof pokemonApi.getPokemonsList> = yield call(
    pokemonApi.getPokemonsList,
    { page: 1, size: 10 },
  );
  yield put(actions.setPokemons(pokemons));
}

export const sagas = {
  loadPokemons: composeSaga(loadPokemonsSaga, [
    loader(config.loaders.loadPokemons),
  ]),
};
