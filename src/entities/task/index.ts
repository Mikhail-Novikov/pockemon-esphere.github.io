import { config } from './config';
import { reducer, actions, selectors, sagas } from './model';

const { toggleTask, reset } = actions;

export * from './ui';
export * as taskLib from './lib';

/** Модель task */
export const taskModel = {
  config,
  reducer,
  actions: {
    toggleTask,
    reset,
  },
  selectors,
  sagas,
};
