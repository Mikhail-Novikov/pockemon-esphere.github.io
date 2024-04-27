import { SagaIterator } from 'redux-saga';
import { call, all, fork } from 'redux-saga/effects';

import { gateModel } from '@shared/lib/store-gate';
import { filterModel } from '@shared/lib/store-filter';

import { taskListPageModel } from '@pages/tasks-list';

import { initAppModel } from '@processes/init';

/**
 * Главная сага - точка входа
 *
 * @returns {void}
 */
export function* rootSaga(): SagaIterator {
  // eslint-disable-next-line no-console
  yield call(console.log, 'Root Saga Runner...!');

  yield all(
    [
      /** shared */
      gateModel.sagas.watcher,
      filterModel.sagas.watcher,

      /** entities */

      /** features */

      /** pages */
      taskListPageModel.sagas.watcher,

      /** proccesses */
      initAppModel.sagas.watcher,
    ].map(fork),
  );
}
