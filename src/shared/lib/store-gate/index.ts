import { reducer, sagas } from './model';
import { config } from './config';
import { setContext } from './gate-monitor';

export * from './hooks';
export { GateCreateParams, Gate } from './types';
export { createGate } from './gate';

export const gateMonitor = {
  setContext,
};

/**
 * Модель gate
 */
export const gateModel = {
  config,
  reducer,
  sagas,
};
