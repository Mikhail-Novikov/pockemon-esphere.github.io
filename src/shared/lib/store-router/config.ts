import { createBrowserHistory } from 'history';

/**
 * Конфигурация модели
 */
export const config = {
  modelName: 'router',
  history: createBrowserHistory(),
} as const;
