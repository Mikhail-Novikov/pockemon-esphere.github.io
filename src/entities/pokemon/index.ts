import { config } from './config';
import { reducer, actions, selectors, sagas } from './model';

const { reset } = actions;

export * from './ui';

/** Модель pokemon */
export const pokemonModel = {
  config,
  reducer,
  actions: {
    reset,
  },
  selectors,
  sagas,
};
