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
  );

  console.log('pokemonApi', pokemons);

  yield put(actions.setPokemons(pokemons));
}

/**
 * Загрузка информации
 * @param {string} name - имя
 * @returns {void}
 */
function* loadPokemonsInfoSaga(name: string): SagaIterator {
  const pokemonInfo: SagaReturnType<typeof pokemonApi.getPokemonInfo> = yield call(
    pokemonApi.getPokemonInfo,
    name,
  );

  console.log('pokemonApi', pokemonInfo);
}

export const sagas = {
  loadPokemons: composeSaga(loadPokemonsSaga, [
    loader(config.loaders.loadPokemons),
  ]),
  loadPokemonsInfo: composeSaga(loadPokemonsInfoSaga, [
    loader(config.loaders.loadPokemons),
  ]),
};
