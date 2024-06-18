import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PokemonsApi } from '@shared/api/pokemon-api';
import { config } from '../config';
import { PokemonState } from './types';

const initialState: PokemonState = {
  pokemons: null,
  allPokemons: null,
  listSelected: [],
};

export type ModelState = PokemonState;

/** Cлайс модели */
const pokemonSlice = createSlice({
  name: config.modelName,
  initialState,
  reducers: {
    setPokemons: (state, { payload }: PayloadAction<PokemonsApi>) => ({
      ...state,
      pokemons: payload,
    }),
    setAllPokemons: (state, { payload: results }) => ({
      ...state,
      allPokemons: results,
    }),
    toggleSelect(state, { payload: name }: PayloadAction<string>): void {
      const index = state.listSelected.indexOf(name);
      if (index === -1) {
        state.listSelected.push(name);
      } else {
        state.listSelected.splice(index, 1);
      }
    },
    reset: () => initialState,
  },
});

export const { reducer, actions } = pokemonSlice;
