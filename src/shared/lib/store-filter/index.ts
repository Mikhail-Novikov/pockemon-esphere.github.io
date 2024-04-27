import { reducer, sagas } from './model';
import { config } from './config';
import { setContext } from './filter-monitor';

export * from './hooks';
export * from './ui';
export {
  Filter,
  FilterType,
  FilterApplyMode,
  FilterCreateParams,
} from './types';
export { createFilter, deleteFilter } from './filter';

export const filterMonitor = {
  setContext,
};

/**
 * Модель filter
 */
export const filterModel = {
  config,
  reducer,
  sagas,
};
