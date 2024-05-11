import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PokemonsApiResponse } from '@shared/api/pokemon-api';

import { setStoreField } from '@shared/lib/store';
import { config } from '../config';

const initialState = {
  pokemons: [] as PokemonsApiResponse[],
};

export type ModelState = typeof initialState;

/** Cлайс модели */
const pokemonSlice = createSlice({
  name: config.modelName,
  initialState,
  reducers: {
    setPokemons: setStoreField('pokemons'),

    reset: () => initialState,
  },
});

export const { reducer, actions } = pokemonSlice;
