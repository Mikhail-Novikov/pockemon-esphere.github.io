import { config } from './config';
import { reducer, actions, selectors, sagas } from './model';

const { togglePokemon, reset } = actions;

export * from './ui';
export * as taskLib from './lib';

/** Модель pokemon */
export const pokemonModel = {
  config,
  reducer,
  actions: {
    togglePokemon,
    reset,
  },
  selectors,
  sagas,
};
