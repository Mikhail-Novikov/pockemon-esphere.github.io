import {
  createHookSelector,
  createModelSelector,
  declareModelStateType,
} from '@shared/lib/store';

import { config } from '../config';

import { ModelState } from './ducks';

/** Селектор состояния модели  */
const toastsSelector = createModelSelector({
  stateType: declareModelStateType<ModelState>(),
  name: config.modelName,
});

export const selectors = {
  useToasts: createHookSelector(toastsSelector),
};
