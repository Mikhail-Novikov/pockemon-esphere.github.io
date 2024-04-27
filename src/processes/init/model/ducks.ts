import { createActionCreatorWithPrefix } from '@shared/lib/store';

import { config } from '../config';

const createAction = createActionCreatorWithPrefix(config.modelName);

/** Экшн для запуска процесса инициализации приложения */
const initApp = createAction('init');

export const actions = {
  initApp,
};
