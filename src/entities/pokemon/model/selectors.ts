import {
  createHookSelector,
  createModelSelector,
  declareModelStateType,
} from '@shared/lib/store';
import { createSelector } from '@reduxjs/toolkit';
import { PokemonState } from './types';
import { config } from '../config';

const modelSelector = createModelSelector<PokemonState, 'pokemons'>({
  stateType: declareModelStateType<PokemonState>(),
  name: config.modelName,
});

/** Селектор списка покемонов */
const pokemonsApiListSelector = createSelector(
  modelSelector,
  (state): { name: string; url: string }[] => state?.pokemons?.results,
);

/** Селектор количества покемонов */
const pokemonsApiCountSelector = createSelector(
  modelSelector,
  (state): number => state?.pokemons?.count,
);

/** Селектор следующей страницы покемонов */
const nextPageUrlSelector = createSelector(
  modelSelector,
  (state): string => state?.pokemons.next,
);

/** Селектор предыдущей страницы покемонов */
const prevPageUrlSelector = createSelector(
  modelSelector,
  (state): string => state?.pokemons.previous,
);

/** Селектор списка всех покемонов */
const allPokemonsSelector = createSelector(
  modelSelector,
  (state): { name: string; url: string }[] => state?.allPokemons,
);

/** Селектор списка выбранных покемонов */
const selectListPokemons = createSelector(
  modelSelector,
  (state): string[] => state?.listSelected,
);

/** Селекторы */
export const selectors = {
  getListPokemons: createHookSelector(pokemonsApiListSelector),
  getCountPokemons: createHookSelector(pokemonsApiCountSelector),
  getNextPageUrl: createHookSelector(nextPageUrlSelector),
  getPrevPageUrl: createHookSelector(prevPageUrlSelector),
  getAllPokemons: createHookSelector(allPokemonsSelector),
  getSelectedPokemons: createHookSelector(selectListPokemons),
  pokemonsApiCountSelector,
};
