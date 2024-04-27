import { SagaIterator } from 'redux-saga';
import { all, takeEvery, call, delay } from 'redux-saga/effects';

import { globalConfig } from '@shared/config';
import { logger } from '@shared/lib/logger';
import { composeSaga } from '@shared/lib/store';
import { loaderModel, loader } from '@shared/lib/store-loader';
import { errorHandler } from '@shared/lib/store-error';

import { actions } from './ducks';

/**
 * Процесс инициализации приложения
 *
 * @returns {void}
 */
function* initAppSaga(): SagaIterator {
  yield delay(globalConfig.defaultDelay);

  yield call(logger, 'Run init process!!!');
}

/**
 * Вотчер процесса инициализации приложения
 *
 * @returns {void}
 */
function* watcher(): SagaIterator {
  yield all([
    takeEvery(
      actions.initApp,
      composeSaga(initAppSaga, [
        errorHandler(),
        loader(loaderModel.config.globalLoader),
      ]),
    ),
  ]);
}

export const sagas = {
  watcher,
};
