import {
  createHookSelector,
  createModelFieldSelector,
  declareModelStateType,
} from '@shared/lib/store';
import { config } from '../config';
import { ModelState } from './ducks';

const fieldSelector = createModelFieldSelector({
  stateType: declareModelStateType<ModelState>(),
  name: config.modelName,
});

/** Селектор. Список api pokемонов */
const pokemonsApiSelector = fieldSelector('pokemons');

/** Селектор. Список покемонов с именами и url-api */
const pokemonsListNameSelector = fieldSelector('list');

/** Селекторы */
export const selectors = {
  useApiPokemons: createHookSelector(pokemonsApiSelector),
  getListPokemons: createHookSelector(pokemonsListNameSelector),
};
