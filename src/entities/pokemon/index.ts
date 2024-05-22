import { config } from './config';
import { reducer, actions, selectors, sagas } from './model';

export * from './ui';

/** Модель pokemon */
export const pokemonModel = {
  config,
  reducer,
  actions,
  selectors,
  sagas,
};
