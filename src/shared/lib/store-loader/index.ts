import { selectors, sagas, reducer, actions } from './model';
import { config } from './config';

export { GlobalLoader } from './ui';
export { loader } from './lib';

/**
 * Модель loader
 */
export const loaderModel = {
  config,
  reducer,
  actions,
  sagas,
  selectors,
};
