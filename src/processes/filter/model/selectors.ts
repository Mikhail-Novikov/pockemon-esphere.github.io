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

/** Селектор. Пагинация */
export const pagingSelector = fieldSelector('paging');

/** Селекторы */
export const selectors = {
  getPaging: createHookSelector(pagingSelector),
};
