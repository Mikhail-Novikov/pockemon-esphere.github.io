import { createSlice } from '@reduxjs/toolkit';

import { PokemonsApiResponse } from '@shared/api/pokemon-api';

import { setStoreField } from '@shared/lib/store';
import { config } from '../config';

const initialState = {
  pokemons: [] as PokemonsApiResponse[],
  list: [] as Array<{ name: string; url: string }>,
};

export type ModelState = typeof initialState;

/** Cлайс модели */
const pokemonSlice = createSlice({
  name: config.modelName,
  initialState,
  reducers: {
    setPokemons: setStoreField('pokemons'),
    setListPokemonsName: setStoreField('list'),
    reset: () => initialState,
  },
});

export const { reducer, actions } = pokemonSlice;
