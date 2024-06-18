import { SagaIterator } from 'redux-saga';
import { put, call, SagaReturnType, select } from 'redux-saga/effects';

import { pokemonApi } from '@shared/api';
import { composeSaga } from '@shared/lib/store';
import { loader } from '@shared/lib/store-loader';

import { config } from '../config';

import { actions } from './ducks';
import { selectors } from './selectors';

/**
 * Загрузка списка покемонов
 * @param {{page: number, size: number}} - параметры запроса
 * @returns {void}
 */
function* loadPokemonsSaga({
  page = 1,
  size = 10,
}: {
  page: number;
  size: number;
}): SagaIterator {
  const pokemons: SagaReturnType<typeof pokemonApi.getPokemonsList> = yield call(
    pokemonApi.getPokemonsList,
    { page, size },
  );
  yield put(actions.setPokemons(pokemons));
}

/**
 * Загрузка имен всех покемонов
 * @returns {void}
 */
function* loadAllPokemonsSaga(): SagaIterator {
  const count = yield select(selectors.pokemonsApiCountSelector);

  const pokemons: SagaReturnType<typeof pokemonApi.getPokemonsList> = yield call(
    pokemonApi.getPokemonsList,
    { size: count },
  );

  const addFieldIsCompleted = pokemons?.results.map((item) => ({
    ...item,
    isSelected: false,
  }));

  yield put(actions.setAllPokemons(addFieldIsCompleted));
}

export const sagas = {
  loadPokemons: composeSaga(loadPokemonsSaga, [
    loader(config.loaders.loadPokemons),
  ]),
  loadPokemonsNames: composeSaga(loadAllPokemonsSaga, [
    loader(config.loaders.loadPokemons),
  ]),
};
